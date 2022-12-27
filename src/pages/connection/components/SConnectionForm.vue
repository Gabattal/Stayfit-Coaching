<template>
    <v-snackbar
        v-model="snackbarState"
        absolute
        color="red"
        location="top"
    >
        Mauvais mot de passe, la prochaine fois c'est 20 burpees.
    </v-snackbar>
    <div class="form">
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
        <SButton
            big
            primary
            @click="connection"
        >
            Connexion
        </SButton>
    </div>
</template>

<script lang="ts">
export default {
    name: "SConnectionForm"
};
</script>

<script setup lang="ts">
import { useFirebaseAuth } from "vuefire";
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";
import { ref } from "vue";
import SButton from "@/design/form/SButton.vue";

const mail = ref("");
const password = ref("");
const snackbarState = ref(false);

async function connection(){
    const auth = useFirebaseAuth();

    if (!auth){
        return;
    }

    await setPersistence(auth, browserLocalPersistence);

    try {
        await signInWithEmailAndPassword(auth, mail.value, password.value);
    }
    catch (error){
        snackbarState.value = true;
    }
}

</script>

<style scoped lang="scss">
.form {
    width: 480px;
    max-width: calc(100% - 2 * var(--length-margin-m));
    display: flex;
    flex-direction: column;
}
</style>
