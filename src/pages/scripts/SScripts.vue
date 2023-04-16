<template />

<script lang="ts">
export default {
    name: "SScripts"
};
</script>

<script setup lang="ts">
import { ref } from "vue";
import { doc, getDocs, increment, query, updateDoc, where } from "firebase/firestore";
import { db, TCustomerCollection } from "@/firebase";


type Customer = TCustomerCollection & { id: string; hasPaid?: boolean };
const customers = ref<Customer[]>([]);

/*const q = query(db.customers);
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    customers.value.push({
        ...doc.data() as TCustomerCollection,
        id: doc.id
    });
});

for (const customer of customers.value) {
    const q = query(db.packs, where("customerId", "==", customer.id));
    const querySnapshot = await getDocs(q);
    let hasFullPaid = 0;
    querySnapshot.forEach((doc) => {
        if (Number(doc.data().totalAmount) === Number(doc.data().totalAmountPaid) &&
            Number(doc.data().totalAmountForGym) === Number(doc.data().totalAmountForGymPaid) &&
                Number(doc.data().totalAmountForCoach) === Number(doc.data().totalAmountForCoachPaid)) {
            hasFullPaid++;
        }
    });
    const customerRef = doc(db.customers, customer.id);
    await updateDoc(customerRef, {
        numberOfPacksFullPaid: hasFullPaid
    });
}*/
</script>

<style scoped lang="scss">

</style>
