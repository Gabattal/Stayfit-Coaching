<template>
    <div class="table-coach">
        <div
            v-for="item in customers"
            :key="item.id"
            class="card"
        >
            <div
                class="name"
                @click="goToCoachView(item.id ,(item.last_name+' '+item.first_name))"
            >
                {{ item.last_name }} {{ item.first_name }}
            </div>
            <div class="info">
                <a
                    class="mail"
                    :href="`mailto:${item.mail}`"
                >
                    {{ item.mail }}
                </a>
                <a
                    class="phone"
                    :href="`tel:${item.phone}`"
                >
                    {{ item.phone }}
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
import { query, getDocs, collection } from "firebase/firestore";
import { onMounted, ref } from "vue";
import { firestore } from "@/firebase";
import { router } from "@/router";
const urlParams = new URLSearchParams(window.location.search);
const coachId = urlParams.get("coachId")?.toString();

type Customer = {
    id: string; first_name: string; last_name: string; mail: string; phone: string;
}
const customers = ref<Customer[]>([]);

async function goToCustomerView(id: string, name: string) {
    await router.push({ path: "/customer", query: { customerId: id, customerName: name } });
}

const getcustomers = async () => {
    if (coachId){
        const q = query(collection(firestore, "users", coachId, "customers"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            customers.value.push({
                ...doc.data(),
                id: doc.id
            });
        });
    }

    customers.value.sort((customerA, customerB) => customerA.last_name.localeCompare(customerB.last_name));
};

onMounted(async () => {
    await getcustomers();
    console.log(customers.value);
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
            color : var(--color-content-softer);
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>
