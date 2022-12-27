<template>
    <SButton
        primary
        @click="GoBack"
    >
        Retour
    </SButton>
</template>

<script lang="ts">
export default {
    name: "SBackButton"
};
</script>

<script setup lang="ts">
import { router } from "@/router";
import SButton from "@/design/form/SButton.vue";
const urlParams = new URLSearchParams(window.location.search);
const coachId = urlParams.get("coachId");
const coachName = urlParams.get("coachName");
const path = router.currentRoute.value.path;
console.log(path);

async function GoBack(){
    if (path === "/add-customer"){
        await router.push({ path: "/coach", query: { coachId, coachName } });
    }
    else {
        await router.push("/admin");
    }
}
</script>

<style scoped lang="scss">

</style>
