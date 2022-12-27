<template>
    <div class="header">
        Stayfit-Coaching
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
     height: 64px;
     display: flex;
     align-items: center;
     justify-content: space-between;
     padding: var(--length-padding-m);
 }
</style>
