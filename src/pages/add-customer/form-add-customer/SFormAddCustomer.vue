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

import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { ref } from "vue";
import SButton from "@/design/form/SButton.vue";
import { db, firestore } from "@/firebase";
import { router } from "@/router";

const last_name = ref("");
const first_name = ref("");
const phone = ref("");
const mail = ref("");
const diseasesRef = ref([]);
const objectivesRef = ref([]);
const diseasePrecision = ref("");
const objectivePrecision = ref("");
const urlParams = new URLSearchParams(window.location.search);
const coachId = urlParams.get("coachId")?.toString();


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

async function saveCustomer() {
    if (coachId) {
        const data = {
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

        await addDoc(collection(firestore, "customers"), data);
        router.go(-1);
    }
}
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
