<template>
    <div class="header">
        Stayfit Bonjouuuur ??
        <SDisconnectButton />
    </div>
</template>

<script lang="ts">
export default {
    name: "SHeader"
};
</script>

<script setup lang="ts">
import SDisconnectButton from "@/design/header/buttons/SDisconnectButton.vue";
</script>

<style scoped lang="scss">
 .header{
     background: var(--color-background-light);
     height: 48px;
     display: flex;
     align-items: center;
     justify-content: space-between;
     padding: var(--length-padding-m);
 }
</style>
