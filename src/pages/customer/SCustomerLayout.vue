<template>
    <SBasicLayout>
        <div class="head">
            <div class="hidden">
                <v-icon
                    icon="mdi-delete-outline"
                    size="large"
                />
                <v-icon
                    icon="mdi-account-edit-outline"
                    size="large"
                />
            </div>
            <div class="title">
                <div>
                    {{ customerName }}
                </div>
                <div>
                    Liste des packs
                </div>
            </div>
            <div class="icons">
                <v-icon
                    icon="mdi-delete-outline"
                    size="large"
                />
                <v-icon
                    icon="mdi-account-edit-outline"
                    size="large"
                />
            </div>
        </div>
        <div class="layout">
            <div class="content">
                <STablePack />
            </div>
        </div>
        <template #footer>
            <div class="footer">
                <div>
                    <SButton
                        v-if="isAdmin"
                        class="button"
                        primary
                        @click="addPack"
                    >
                        Ajouter
                    </SButton>
                </div>
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
    name: "SCustomerLayout"
};
</script>

<script setup lang="ts">

import SBasicLayout from "@/design/SBasicLayout.vue";
import SBackButton from "@/design/back-button/SBackButton.vue";
import SButton from "@/design/form/SButton.vue";
import { router } from "@/router";
import STablePack from "@/pages/customer/table/STablePack.vue";
import { useUserStore } from "@/stores/user";
const urlParams = new URLSearchParams(window.location.search);
const customerId = urlParams.get("customerId");
const customerName = urlParams.get("customerName");
const coachId = urlParams.get("coachId");
const coachName = urlParams.get("coachName");
const userStore = useUserStore();
const isAdmin = userStore.isAdmin;

async function addPack(){
    await router.push({ path: "/add-pack", query: { coachId, coachName, customerId, customerName } });
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

.back-button{
    display: flex;
}
.footer {
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.head{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.hidden{
    visibility: hidden;
}

.icons{
    display: flex;
    justify-content: flex-end;
}
</style>
