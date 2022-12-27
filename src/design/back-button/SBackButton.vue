<template>
    <div class="button">
        <v-btn
            size="small"
            variant="tonal"
            @click="GoBack"
        >
            Retour
        </v-btn>
    </div>
</template>

<script lang="ts">
export default {
    name: "SBackButton"
};
</script>

<script setup lang="ts">
import { router } from "@/router";

async function GoBack(){
    await router.push("/admin");
}
</script>

<style scoped lang="scss">
.button{
    padding: var(--length-padding-m);
}
</style>
