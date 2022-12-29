<template>
    <SBasicLayout>
        <div class="title">
            Informations de {{ coachName }}
        </div>
        <div class="layout">
            <SCoachingProfileData />
        </div>
        <template #footer>
            <div class="footer">
                <SButton
                    class="button"
                    primary
                    @click="router.go(-1)"
                >
                    Retour
                </SButton>
            </div>
        </template>
    </SBasicLayout>
</template>

<script lang="ts">
export default {
    name: "SCoachProfileLayout"
};
</script>

<script setup lang="ts">
import SButton from "@/design/form/SButton.vue";
import SBasicLayout from "@/design/SBasicLayout.vue";
import { router } from "@/router";
import SCoachingProfileData from "@/pages/coach-profile/data/SCoachingProfileData.vue";
const urlParams = new URLSearchParams(window.location.search);
const coachName = urlParams.get("coachName");

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
    justify-content: flex-end;
}
</style>
