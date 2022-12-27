<template>
    <SHeader class="header" />
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

<script lang="ts">
export default {
    name: "SCoachLayout"
};
</script>

<script setup lang="ts">

import SHeader from "@/design/header/SHeader.vue";
import SBackButton from "@/design/back-button/SBackButton.vue";
import SButton from "@/design/form/SButton.vue";
import { router } from "@/router";
import StableCustomer from "@/pages/coach/table/STableCustomer.vue";
const urlParams = new URLSearchParams(window.location.search);
const coachId = urlParams.get("coachId");
const coachName = urlParams.get("coachName");

async function addCustomer() {
    await router.push({ path: "/add-customer", query: { coachId, coachName } });
}

</script>

<style scoped lang="scss">

.title{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: var(--length-margin-xs);
    font-weight: bold;
}

.layout {
    display: flex;
    flex-direction: column;
    margin: var(--length-margin-m) var(--length-margin-m);

    .header{
        width: 100%;
    }
}

.footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: var(--color-background);
    .button{
        margin: var(--length-margin-xs);
    }
    .back-button{
        position: absolute;
        right: 0;
        margin: var(--length-margin-xs);
    }
}
</style>
