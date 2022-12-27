<template>
    <SButton
        primary
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
const urlParams = new URLSearchParams(window.location.search);
const coachId = urlParams.get("coachId");

async function GoBack(){
    await router.go(-1);
}
</script>

<style scoped lang="scss">

</style>
