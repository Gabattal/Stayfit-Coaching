<template>
    <SHeader class="header" />
    <div class="title">
        Liste des coachs
    </div>
    <div class="layout">
        <STableCoach />
    </div>
    <div class="footer">
        <SButton
            class="button"
            primary
            @click="addCoach"
        >
            Ajouter
        </SButton>
    </div>
</template>

<script lang="ts">
export default {
    name: "SAdminLayout"
};
</script>

<script setup lang="ts">
import SHeader from "@/design/header/SHeader.vue";
import STableCoach from "@/pages/admin/table/STableCoach.vue";
import { router } from "@/router";
import SButton from "@/design/form/SButton.vue";

async function addCoach() {
    await router.push("/add-coach");
}
</script>

<style scoped lang="scss">
.title{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: var(--length-margin-xs);
    font-weight: bold;
}

.layout {
    display: flex;
    flex-direction: column;
    margin: var(--length-margin-m) var(--length-margin-m);

    .header {
        width: 100%;
    }
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
