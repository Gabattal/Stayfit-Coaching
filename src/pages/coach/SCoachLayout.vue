<template>
    <SBasicLayout>
        <v-dialog
            v-model="dialog"
        >
            <v-card>
                <v-card-title class="card-title">
                    Suppression de {{ coachName }}
                </v-card-title>
                <v-card-text>
                    Êtes-vous sûr de vouloir supprimer ce coach?
                </v-card-text>
                <div class="card-actions">
                    <SButton
                        big
                        primary
                        @click="deleteCoach"
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
                    {{ coachName }}
                </div>
                <div>
                    Liste des adhérents
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
                    @click="modifyCoach"
                />
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
import { ref } from "vue";
import { deleteDoc, doc } from "firebase/firestore";
import SBackButton from "@/design/back-button/SBackButton.vue";
import SButton from "@/design/form/SButton.vue";
import { router } from "@/router";
import StableCustomer from "@/pages/coach/table/STableCustomer.vue";
import SBasicLayout from "@/design/SBasicLayout.vue";
import { useUserStore } from "@/stores/user";
import { db } from "@/firebase";

const urlParams = new URLSearchParams(window.location.search);
const coachId = urlParams.get("coachId");
const coachName = urlParams.get("coachName");
const userStore = useUserStore();
const isAdmin = userStore.isAdmin;
const dialog = ref(false);

async function addCustomer() {
    await router.push({ path: "/add-customer", query: { coachId, coachName } });
}
async function deleteCoach(){
    dialog.value = false;
    await deleteDoc(doc(db.users,coachId));
    router.go(-1);
}

async function modifyCoach(){
    await router.push({ path: "/add-coach", query: { coachId } });
}

</script>

<style scoped lang="scss">

.head{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: var(--length-margin-xs);
        font-weight: bold;
    }

    .icons{
        display: flex;
        justify-content: flex-end;
        cursor: pointer;
    }
}

.card-actions{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: var(--length-padding-m);
}


.footer {
    display: flex;
    width: 100%;
    justify-content: space-between;
}

</style>
