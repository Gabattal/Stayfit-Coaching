<template>
    <v-snackbar
        v-model="snackbarState"
        absolute
        color="red"
        top
    >
        {{ snackbarText }}
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
        <v-btn
            size="large"
            variant="tonal"
            @click="connection"
        >
            Connexion
        </v-btn>
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

const mail = ref("");
const password = ref("");
const snackbarState = ref(false);
const snackbarText = "Mauvais mot de passe, la prochaine fois c'est 20 burpees.";

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
