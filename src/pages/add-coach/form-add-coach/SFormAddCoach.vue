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
        <v-text-field
            v-model="password"
            label="Mot de passe"
            type="password"
        />
        <v-btn
            size="large"
            variant="tonal"
            @click="saveCoach"
        >
            Enregistrer
        </v-btn>
    </div>
</template>

<script lang="ts">
export default {
    name: "SFormAddCoach"
};
</script>

<script setup lang="ts">
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref } from "vue";
import { db } from "@/firebase";
import { router } from "@/router";

const last_name = ref("");
const first_name = ref("");
const phone = ref("");
const mail = ref("");
const password = ref("");

async function saveCoach(){


    const auth = getAuth();
    const response = await createUserWithEmailAndPassword(auth, mail.value, password.value);
    const localId = response.user.uid;
    const data = {
        "first_name": first_name.value,
        "isAdmin": false,
        "last_name": last_name.value,
        "mail": mail.value,
        "phone": phone.value
    };
    await setDoc(doc(db,"users", localId), data);
    await router.push("/admin");

    console.log(response.user.uid);
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
