<template>
    <router-view />
</template>

<script lang="ts">
export default {
    name: "App"
};
</script>

<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStore } from "@/stores/user";
useUserStore();
const userStore = useUserStore();

onMounted(() => {
    //console.log(userStore.user);
});
</script>

<style lang="scss">
@import "./style";
</style>

<style scoped lang="scss">
</style>
