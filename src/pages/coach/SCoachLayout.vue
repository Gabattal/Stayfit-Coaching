<template>
    <SHeader class="header" />
    <div class="layout">
        <div class="content">
            <STableCoach />
        </div>
    </div>
    <SButton
        class="button"
        primary
        @click="addCoach"
    >
        Ajouter
    </SButton>
</template>

<script lang="ts">
export default {
    name: "SCoachLayout"
};
</script>

<script setup lang="ts">

import SHeader from "@/design/header/SHeader.vue";
import SBackButton from "@/design/back-button/SBackButton.vue";
import STableCoach from "@/pages/admin/table/STableCoach.vue";
import SButton from "@/design/form/SButton.vue";
const urlParams = new URLSearchParams(window.location.search);
const coachId = urlParams.get("coachId");
</script>

<style scoped lang="scss">
.layout {
    display: flex;
    flex-direction: column;
    margin: var(--length-margin-m) var(--length-margin-m);

    .header{
        width: 100%;
    }
}

.button{
    position: fixed;
    bottom: var(--length-margin-m);
    left: var(--length-margin-m);
}
</style>
