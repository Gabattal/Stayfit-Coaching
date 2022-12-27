<template>
    <SHeader />
    <div class="container">
        <SFormAddCustomer />
    </div>
    <div class="footer">
        <SBackButton class="button" />
    </div>
</template>

<script lang="ts">
export default {
    name: "SaddCustomer"
};
</script>

<script setup lang="ts">

import SHeader from "@/design/header/SHeader.vue";
import SBackButton from "@/design/back-button/SBackButton.vue";
import SFormAddCustomer from "@/pages/add-customer/form-add-customer/SFormAddCustomer.vue";
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
