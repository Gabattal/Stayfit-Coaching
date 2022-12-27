<template>
    <SButton
        primary
        @click="disconnect"
    >
        Déconnexion
    </SButton>
</template>

<script lang="ts">
export default {
    name: "SDisconnectButton"
};
</script>

<script setup lang="ts">
import { useFirebaseAuth } from "vuefire";
import SButton from "@/design/form/SButton.vue";

async function disconnect(){
    const auth = useFirebaseAuth();
    await auth?.signOut();
}
</script>

<style scoped lang="scss">

</style>
