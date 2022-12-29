<template>
    <div class="table-coach">
        <div
            v-for="customer in customers"
            :key="customer.id"
            class="card"
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
    name: "SHomeTable"
};
</script>

<script setup lang="ts">
import { getDocs, query, where } from "firebase/firestore";
import { onMounted, ref } from "vue";
import { db, TCustomerCollection } from "@/firebase";
import { displayPhone } from "@/lib/user";
import { router } from "@/router";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const coachId = userStore.user?.uid;
const coachName = userStore.userName;

type Customer = TCustomerCollection & {id: string};
const customers = ref<Customer[]>([]);

async function goToCustomerView(id: string, name: string) {
    await router.push({ path: "/customer", query: { coachId, coachName, customerId: id, customerName: name } });
}

async function goToCustomerProfile(id: string, name: string) {
    await router.push({ path: "/customer-profile", query: { customerId: id, customerName: name } });
}

const getCustomers = async () => {
    if (coachId){
        const q = query(db.customers,where("coachId", "==", coachId));
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
    console.log(customers);
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

        .name{
            font-weight: bold;
            font-size: 1.25rem;
        }

        .info {
            display: flex;
            justify-content: space-between;
        }

        .precisions{
            color : var(--color-content-softer);
            display: flex;
            flex-direction: column;
            //justify-content: space-between;
        }
    }
}
</style>
