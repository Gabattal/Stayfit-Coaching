<template>
    <SBasicLayout>
        <div class="title">
            {{ coachName }}
            <div>
                Liste des adhérents
            </div>
        </div>
        <div class="layout">
            <div class="content">
                <StableCustomer />
            </div>
        </div>
        <template #footer>
            <div class="footer">
                <SButton
                    class="button"
                    primary
                    @click="addCustomer"
                >
                    Ajouter
                </SButton>
                <SBackButton
                    class="back-button"
                    primary
                >
                    Retour
                </SBackButton>
            </div>
        </template>
    </SBasicLayout>
</template>

<script lang="ts">
export default {
    name: "SCoachLayout"
};
</script>

<script setup lang="ts">
import SBackButton from "@/design/back-button/SBackButton.vue";
import SButton from "@/design/form/SButton.vue";
import { router } from "@/router";
import StableCustomer from "@/pages/coach/table/STableCustomer.vue";
import SBasicLayout from "@/design/SBasicLayout.vue";

const urlParams = new URLSearchParams(window.location.search);
const coachId = urlParams.get("coachId");
const coachName = urlParams.get("coachName");

async function addCustomer() {
    await router.push({ path: "/add-customer", query: { coachId, coachName } });
}

</script>

<style scoped lang="scss">

.title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: var(--length-margin-xs);
    font-weight: bold;
}

.footer {
    display: flex;
    width: 100%;
    justify-content: space-between;
}

</style>
