<template>
    <Suspense>
        <router-view />
    </Suspense>
</template>

<script lang="ts">
export default {
    name: "App"
};
</script>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
useUserStore();
</script>

<style lang="scss">
@import "./style";
</style>

<style scoped lang="scss">
</style>
