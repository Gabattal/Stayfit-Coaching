<template>
    <v-btn
        size="small"
        variant="tonal"
        @click="disconnect"
    >
        Déconnexion
    </v-btn>
</template>

<script lang="ts">
export default {
    name: "SDisconnectButton"
};
</script>

<script setup lang="ts">
import { useFirebaseAuth } from "vuefire";

async function disconnect(){
    const auth = useFirebaseAuth();
    await auth?.signOut();
}
</script>

<style scoped lang="scss">

</style>
