<template>
    <div class="home">
        <SConnectionForm />
    </div>
</template>

<script lang="ts">
export default {
    name: "SConnectionLayout"
};
</script>

<script setup lang="ts">
import SConnectionForm from "./components/SConnectionForm.vue";

</script>

<style scoped lang="scss">
.home {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .form {
        width: 480px;
        max-width: calc(100% - 2 * var(--length-margin-m));
        display: flex;
        flex-direction: column;
    }
}
</style>
