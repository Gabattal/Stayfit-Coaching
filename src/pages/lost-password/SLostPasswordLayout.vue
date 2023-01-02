<template>
    <v-snackbar
        v-model="snackbarState"
        absolute
        color="green"
        location="top"
    >
        Un email pour réinitialiser ton mot de passe t'a été envoyé. (Check tes spams)
    </v-snackbar>
    <div class="connexion">
        <SButton
            primary
            @click="router.go(-1)"
        >
            Connexion
        </SButton>
    </div>
    <div class="home">
        <div class="form">
            <v-text-field
                v-model="mail"
                label="Mail"
                type="email"
            />
            <SButton
                big
                primary
                @click="sendEmail"
            >
                Réinitialiser mot de passe
            </SButton>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "SLostPasswordLayout"
};
</script>

<script setup lang="ts">
import { ref } from "vue";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import SButton from "@/design/form/SButton.vue";
import { router } from "@/router";
const mail = ref("");
const snackbarState = ref(false);

async function sendEmail(){
    const auth = getAuth();
    snackbarState.value = true;

    sendPasswordResetEmail(auth, mail.value)
        .then(() => {
            snackbarState.value = true;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

</script>

<style scoped lang="scss">
.connexion{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: var(--length-margin-xs);
}
.home {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .form {
        width: 480px;
        max-width: calc(100% - 2 * var(--length-margin-m));
        display: flex;
        flex-direction: column;
    }
}
</style>
