<template>
    <SBasicLayout>
        <div class="title">
            {{ coachName }}
            <div>
                Liste des adhérents
            </div>
        </div>
        <div class="layout">
            <SHomeTable />
        </div>
        <template #footer>
            <div class="footer">
                <v-icon
                    icon="mdi-information-outline"
                    size="large"
                    @click="goToCoachProfile()"
                />
            </div>
        </template>
    </SBasicLayout>
</template>

<script lang="ts">
export default {
    name: "SHomeLayout"
};
</script>

<script setup lang="ts">

import SBasicLayout from "@/design/SBasicLayout.vue";
import SButton from "@/design/form/SButton.vue";
import { router } from "@/router";
import SHomeTable from "@/pages/home/table/SHomeTable.vue";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const coachName = userStore.userName;
const coachId = userStore.user?.uid;

async function goToCoachProfile(){
    await router.push({ path: "/coach-profile", query: { coachId, coachName } });
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

.footer{
    width: 100%;
    display: flex;
    justify-content: flex-end;
}
</style>
