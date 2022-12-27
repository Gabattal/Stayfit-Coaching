<template>
    <button
        class="button"
        :class="{primary, big}"
    >
        <slot />
    </button>
</template>

<script lang="ts">
export default {
    name: "SButton"
};
</script>

<script setup lang="ts">
const props = defineProps<{
    big?: boolean;
    primary?: boolean;
}>();
</script>

<style scoped lang="scss">
.button{
    padding: var(--length-padding-xxs) var(--length-padding-s);
    border-radius: var(--length-radius-m);
    background: var(--color-background-lighter);

    &.primary{
        background: var(--color-primary);
    }

    &.big {
        font-size: 1.25rem;
        padding: var(--length-padding-xs) var(--length-padding-m);
    }
}
</style>
