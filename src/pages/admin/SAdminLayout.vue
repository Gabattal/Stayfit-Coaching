<template>
    <SBasicLayout>
        <div class="title">
            Liste des coachs
        </div>
        <div class="layout">
            <STableCoach />
        </div>
        <template #footer>
            <div class="footer">
                <SButton
                    class="button"
                    primary
                    @click="addCoach"
                >
                    Ajouter
                </SButton>
                <v-icon
                    icon="mdi-information-outline"
                    size="x-large"
                    @click="goToAdminProfile()"
                />
            </div>
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

async function goToAdminProfile(){
    await router.push("/admin-profile");
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

.footer{
    width: 100%;
    display: flex;
    justify-content: space-between;
}

</style>
