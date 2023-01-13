<template>
    <SBasicLayout>
        <v-dialog
            v-model="dialog"
        >
            <v-card>
                <v-card-title class="card-title">
                    Suppression de {{ customerName }}
                </v-card-title>
                <v-card-text>
                    Êtes-vous sûr de vouloir supprimer cet utilisateur?
                </v-card-text>
                <div class="card-actions">
                    <SButton
                        big
                        primary
                        @click="deleteUser"
                    >
                        Oui
                    </SButton>
                    <SButton
                        big
                        error
                        @click="dialog = false"
                    >
                        Non
                    </SButton>
                </div>
            </v-card>
        </v-dialog>
        <div class="head">
            <div class="title">
                <div>
                    {{ customerName }}
                </div>
                <div>
                    Liste des packs
                </div>
            </div>
            <div
                v-if="isAdmin"
                class="icons"
            >
                <v-icon
                    icon="mdi-delete-outline"
                    size="large"
                    @click="dialog=true"
                />
                <v-icon
                    icon="mdi-account-edit-outline"
                    size="large"
                    @click="modifyUser"
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

import { ref } from "vue";
import { deleteDoc, doc } from "firebase/firestore";
import SBasicLayout from "@/design/SBasicLayout.vue";
import SBackButton from "@/design/back-button/SBackButton.vue";
import SButton from "@/design/form/SButton.vue";
import { router } from "@/router";
import STablePack from "@/pages/customer/table/STablePack.vue";
import { useUserStore } from "@/stores/user";
import { db } from "@/firebase";
const urlParams = new URLSearchParams(window.location.search);
const customerId = urlParams.get("customerId");
const customerName = urlParams.get("customerName");
const coachId = urlParams.get("coachId");
const coachName = urlParams.get("coachName");
const userStore = useUserStore();
const isAdmin = userStore.isAdmin;
const dialog = ref(false);

async function deleteUser(){
    dialog.value = false;
    await deleteDoc(doc(db.customers,customerId));
    router.go(-1);
}

async function modifyUser(){
    await router.push({ path: "/add-customer", query: { coachId, coachName, customerId } });
}

async function addPack(){
    await router.push({ path: "/add-pack", query: { coachId, coachName, customerId, customerName } });
}
</script>

<style scoped lang="scss">
.title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: var(--length-margin-xs);
    font-weight: bold;
}

.card-actions{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: var(--length-padding-m);
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
    cursor: pointer;
}
</style>
