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
            v-if="!coachId"
            v-model="mail"
            label="Mail"
            type="email"
        />
        <v-text-field
            v-if="!coachId"
            v-model="password"
            label="Mot de passe"
            type="password"
        />
        <SButton
            big
            primary
            @click="saveCoach"
        >
            Enregistrer
        </SButton>
    </div>
</template>

<script lang="ts">
export default {
    name: "SFormAddCoach"
};
</script>

<script setup lang="ts">
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { onMounted, ref } from "vue";
import { db, firestore } from "@/firebase";
import { router } from "@/router";
import SButton from "@/design/form/SButton.vue";

const urlParams = new URLSearchParams(window.location.search);
const coachId = urlParams.get("coachId");
const last_name = ref("");
const first_name = ref("");
const phone = ref("");
const mail = ref("");
const password = ref("");

async function saveCoach(){

    if (!coachId){
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
        await setDoc(doc(firestore,"users", localId), data);
        await router.go(-1);
    }
    else {

        const coachRef = doc(db.users, coachId);
        try {
            await updateDoc(coachRef, {
                first_name: first_name.value,
                last_name: last_name.value,
                phone: phone.value
            });
            await router.push("/admin");
        }
        catch (e){
            console.error(e);
        }
    }
}

const getCoachData = async () => {
    const userDoc = await getDoc(doc(db.users, coachId));
    console.log(userDoc.data());
    last_name.value = userDoc.data()?.last_name || "";
    first_name.value = userDoc.data()?.first_name || "";
    phone.value = userDoc.data()?.phone || "";
};

onMounted(() => {
    if (coachId){
        getCoachData();
    }
});
</script>

<style scoped lang="scss">
.form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
