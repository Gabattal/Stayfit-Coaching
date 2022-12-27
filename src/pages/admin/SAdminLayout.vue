<template>
    <SBasicLayout>
        <div class="title">
            Liste des coachs
        </div>
        <div class="layout">
            <STableCoach />
        </div>
        <template #footer>
            <SButton
                class="button"
                primary
                @click="addCoach"
            >
                Ajouter
            </SButton>
        </template>
    </SBasicLayout>
</template>

<script lang="ts">
export default {
    name: "SAdminLayout"
};
</script>

<script setup lang="ts">
import STableCoach from "@/pages/admin/table/STableCoach.vue";
import { router } from "@/router";
import SButton from "@/design/form/SButton.vue";
import SBasicLayout from "@/design/SBasicLayout.vue";

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

</style>
