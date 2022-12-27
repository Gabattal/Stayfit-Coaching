<template>
    <SHeader />
    <div class="container">
        <SFormAddCoach />
    </div>
    <div class="footer">
        <SBackButton class="button" />
    </div>
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

.button {
    margin: var(--length-margin-xs);
}

.footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: var(--color-background);
}
</style>
