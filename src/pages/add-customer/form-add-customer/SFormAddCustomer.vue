<template>
    <div class="form">
        <v-text-field
            v-model="last_name"
            label="Nom"
            type="text"
        />
        <v-text-field
            v-model="first_name"
            label="Prénom"
            type="text"
        />
        <v-text-field
            v-model="phone"
            label="Téléphone"
            type="text"
        />
        <v-text-field
            v-model="mail"
            label="Mail"
            type="email"
        />

        <v-select
            v-model="objectivesRef"
            chips
            :items="objectivesValues"
            label="Objectif(s)"
            multiple
        />

        <v-textarea
            v-if="objectivesRef.includes('Autres / Préciser')"
            v-model="objectivePrecision"
            label="Précision Objectif"
            maxlength="120"
            type="text"
        />

        <v-select
            v-model="diseasesRef"
            chips
            :items="diseasesValues"
            label="Problème(s) de santé"
            multiple
        />

        <v-textarea
            v-if="diseasesRef.includes('Autres / Préciser')"
            v-model="diseasePrecision"
            label="Précision problème de santé"
            maxlength="120"
            type="text"
        />

        <v-select
            v-model="avalablitiesRef"
            chips
            :items="availabilities"
            label="Disponibilités"
            multiple
        />

        <SButton
            big
            primary
            @click="saveCustomer"
        >
            Enregistrer
        </SButton>
    </div>
</template>

<script lang="ts">
export default {
    name: "SFormAddCustomer"
};
</script>

<script setup lang="ts">

import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { onMounted, ref } from "vue";
import SButton from "@/design/form/SButton.vue";
import { db, firestore, TCustomerCollection } from "@/firebase";
import { router } from "@/router";

const last_name = ref("");
const first_name = ref("");
const phone = ref("");
const mail = ref("");
const diseasesRef = ref([]);
const objectivesRef = ref([]);
const avalablitiesRef = ref([]);
const diseasePrecision = ref("");
const objectivePrecision = ref("");
const urlParams = new URLSearchParams(window.location.search);
const coachId = urlParams.get("coachId")?.toString();
const customerId = urlParams.get("customerId")?.toString();
type Customer = TCustomerCollection;
const customerData = ref<Customer>();


const objectivesValues = [
    "Perte de poids" ,
    "Prise de muscles" ,
    "Rééducation" ,
    "Préparation spécifique" ,
    "Autres / Préciser"
];

const diseasesValues = [
    "Aucun",
    "Genoux" ,
    "Dos" ,
    "Poignets" ,
    "Coeur" ,
    "Autres / Préciser"
];

const availabilities = [
    "Lundi matin", "Lundi midi" , "Lundi soir" ,
    "Mardi matin", "Mardi midi" , "Mardi soir" ,
    "Mercredi matin", "Mercredi midi" , "Mercredi soir" ,
    "Jeudi matin", "Jeudi midi" , "Jeudi soir" ,
    "Vendredi matin", "Vendredi midi" , "Vendredi soir" ,
    "Samedi matin", "Samedi midi" , "Samedi soir" ,
    "Dimanche matin", "Dimanche midi" , "Dimanche soir"
];

async function saveCustomer() {
    const data = {
        "availabilities": avalablitiesRef.value,
        "coachId": coachId,
        "diseasePrecision": diseasePrecision.value,
        "diseases": diseasesRef.value,
        "first_name": first_name.value,
        "last_name": last_name.value,
        "mail": mail.value,
        "objectivePrecision": objectivePrecision.value,
        "objectives": objectivesRef.value,
        "phone": phone.value
    };
    if (coachId && !customerId) {
        const newData = {
            "numberOfPacks": 0,
            "numberOfPacksFullPaid": 0,
            "numberOfPacksPaid": 0
        };

        const dataForNewCustomer = Object.assign(data, newData);
        await addDoc(collection(firestore, "customers"), dataForNewCustomer);
        router.go(-1);
    }
    else if (coachId && customerId){
        await setDoc(doc(db.customers, customerId), data);
        router.go(-1);
    }
}

const getCustomerData = async () => {
    const userDoc = await getDoc(doc(db.customers, customerId));

    customerData.value = userDoc.data();
    last_name.value = userDoc.data()?.last_name || "";
    first_name.value = userDoc.data()?.first_name || "";
    phone.value = userDoc.data()?.phone || "";
    mail.value = userDoc.data()?.mail || "";
    objectivesRef.value = userDoc.data()?.objectives || [];
    objectivePrecision.value = userDoc.data()?.objectivePrecision || "";
    diseasesRef.value = userDoc.data()?.diseases || [];
    diseasePrecision.value = userDoc.data()?.diseasePrecision || "";
    avalablitiesRef.value = userDoc.data()?.availabilities || [];
};

onMounted(() => {
    if (customerId){
        getCustomerData();
    }
});
</script>

<style scoped lang="scss">
.form {
    width: 480px;
    max-width: calc(100% - 2 * var(--length-margin-m));
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
