<template>
    <SButton
        @click="GoBack"
    >
        Retour
    </SButton>
</template>

<script lang="ts">
export default {
    name: "SBackButton"
};
</script>

<script setup lang="ts">
import { router } from "@/router";
import SButton from "@/design/form/SButton.vue";

async function GoBack(){
    await router.push("/admin");
}
</script>

<style scoped lang="scss">

</style>
