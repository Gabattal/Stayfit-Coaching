<template>
    <SHeader />
    <div class="container">
        <SFormAddCoach />
    </div>
    <SBackButton class="button" />
</template>

<script lang="ts">
export default {
    name: "SaddCoach"
};
</script>

<script setup lang="ts">

import SHeader from "@/design/header/SHeader.vue";
import SBackButton from "@/design/back-button/SBackButton.vue";
import SFormAddCoach from "@/pages/add-coach/form-add-coach/SFormAddCoach.vue";
</script>

<style scoped lang="scss">
.container{
    height: calc(100vh - var(--length-margin-xxl));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.button{
    position: fixed;
    bottom: var(--length-margin-m);
    left: var(--length-margin-m);
}
</style>
