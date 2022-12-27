<template>
    <SHeader />
    <SBackButton />
    coucou
</template>

<script lang="ts">
export default {
    name: "SaddCustomer"
};
</script>

<script setup lang="ts">

import SHeader from "@/design/header/SHeader.vue";
import SBackButton from "@/design/back-button/SBackButton.vue";
const urlParams = new URLSearchParams(window.location.search);
const coachId = urlParams.get("coachId");
</script>

<style scoped lang="scss">

</style>
