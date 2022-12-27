<template>
    <div class="layout">
        <div class="header-wrapper">
            <slot name="header">
                <SHeader />
            </slot>
        </div>
        <div class="content">
            <slot />
        </div>
        <div class="footer-wrapper">
            <slot name="footer" />
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "SBasicLayout"
};
</script>

<script setup lang="ts">

import SHeader from "@/design/header/SHeader.vue";
</script>

<style scoped lang="scss">
.layout {
    display: flex;
    flex-direction: column;
    height: 100vh;

    .header-wrapper, .footer-wrapper {
        height: 64px;
        background: var(--color-background-light);
        box-shadow: 0 0 16px var(--color-background);
        flex-shrink: 0;
        position: relative;
    }

    .footer-wrapper {
        padding: var(--length-padding-m);
        display: flex;
        align-items: center;
    }

    .content {
        padding: var(--length-padding-m);
        flex-grow: 1;
        flex-shrink: 1;
        overflow: auto;
    }
}
</style>
