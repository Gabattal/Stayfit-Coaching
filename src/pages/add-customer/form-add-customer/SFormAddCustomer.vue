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
        <SButton
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

import { addDoc, collection } from "firebase/firestore";
import { ref } from "vue";
import SButton from "@/design/form/SButton.vue";
import { db } from "@/firebase";

const last_name = ref("");
const first_name = ref("");
const phone = ref("");
const mail = ref("");
const urlParams = new URLSearchParams(window.location.search);
const coachId = urlParams.get("coachId")?.toString();

async function saveCustomer() {
    if (coachId) {
        await addDoc(collection(db, "users", coachId, "customers"), {
            "first_name": first_name.value,
            "last_name": last_name.value,
            "mail": mail.value,
            "phone": phone.value
        });
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
