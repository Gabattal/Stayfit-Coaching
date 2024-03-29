<template>
    <div class="table-coach">
        <div
            v-for="customer in customers"
            :key="customer.id"
            class="card"
            :class="{
                orange: customer.numberOfPacks === customer.numberOfPacksPaid && customer.numberOfPacks !== customer.numberOfPacksFullPaid,
                green: customer.numberOfPacks === customer.numberOfPacksFullPaid
            }"
        >
            <div class="info">
                <div
                    class="name"
                    @click="goToCustomerView(customer.id ,(customer.last_name+' '+customer.first_name))"
                >
                    {{ customer.last_name }} {{ customer.first_name }}
                </div>

                <v-icon
                    icon="mdi-information-outline"
                    size="large"
                    @click="goToCustomerProfile(customer.id,(customer.last_name+' '+customer.first_name))"
                />
            </div>
            <div class="info">
                <a
                    class="mail"
                    :href="`mailto:${customer.mail}`"
                >
                    {{ customer.mail }}
                </a>
                <a
                    class="phone"
                    :href="`tel:${customer.phone}`"
                >
                    {{ displayPhone(customer.phone) }}
                </a>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
export default {
    name: "StableCustomer",
    customers: "test"
};
</script>

<script setup lang="ts">
import { query, getDocs, where } from "firebase/firestore";
import { onMounted, ref } from "vue";
import { displayPhone } from "@/lib/user";
import { TCustomerCollection, db } from "@/firebase";
import { router } from "@/router";
import { useUserStore } from "@/stores/user";

const urlParams = new URLSearchParams(window.location.search);
const coachId = urlParams.get("coachId")?.toString();
const coachName = urlParams.get("coachName")?.toString();
const userStore = useUserStore();
const isAdmin = userStore.isAdmin;

type Customer = TCustomerCollection & { id: string; hasPaid?: boolean };
const customers = ref<Customer[]>([]);

async function goToCustomerView(id: string, name: string) {
    await router.push({ path: "/customer", query: { coachId, coachName, customerId: id, customerName: name } });
}

async function goToCustomerProfile(id: string, name: string) {
    await router.push({ path: "/customer-profile", query: { customerId: id, customerName: name } });
}

const getCustomers = async () => {
    if (coachId) {
        const q = query(db.customers, where("coachId", "==", coachId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            customers.value.push({
                ...doc.data() as TCustomerCollection,
                id: doc.id
            });
        });
    }

    customers.value.sort((customerA, customerB) => customerA.last_name.localeCompare(customerB.last_name));

};

onMounted(async () => {
    await getCustomers();
});

</script>

<style scoped lang="scss">
.table-coach {
    display: flex;
    flex-direction: column;
    gap: var(--length-gap-m);

    .card {
        padding: var(--length-padding-m);
        background: var(--color-background-light);
        cursor: pointer;
        border-radius: var(--length-radius-m);
        display: flex;
        flex-direction: column;
        gap: var(--length-gap-xs);

        &.green {
            background: darkgreen;
        }

        &.orange {
            background: darkorange;
        }

        .name {
            font-weight: bold;
            font-size: 1.25rem;
        }

        .mail {
            padding-right: var(--length-padding-xs);
        }

        .info {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
        }

        .precisions {
            color: var(--color-content-softer);
            display: flex;
            flex-direction: column;
            //justify-content: space-between;
        }
    }
}
</style>
