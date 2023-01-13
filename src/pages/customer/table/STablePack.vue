<template>
    <v-dialog
        v-model="dialog"
    >
        <v-card>
            <v-card-title class="card-title">
                {{ packNameDelete }}
            </v-card-title>
            <v-card-text>
                Êtes-vous sûr de vouloir supprimer ce pack?
            </v-card-text>
            <div class="card-actions">
                <SButton
                    big
                    primary
                    @click="deletePack"
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
    <div class="table-coach">
        <div
            v-for="item in packs"
            :key="item.id"
            class="card"
        >
            <div
                class="name"
            >
                <div @click="goToPackView(item.id ,item.packName)">
                    {{ item.packName }}
                </div>
                <div
                    v-if="isAdmin"
                    class="actions"
                >
                    <v-icon
                        icon="mdi-delete-outline"
                        size="large"
                        @click="openDialog(item.id, item.packName)"
                    />
                </div>
            </div>

            <div class="info">
                <div class="line">
                    Montant restant total:
                    <div class="data">
                        {{ item.totalAmount-item.totalAmountPaid }}€
                    </div>
                </div>
                <div class="line">
                    Montant restant coach:
                    <div class="data">
                        {{ item.totalAmountForCoach-item.totalAmountForCoachPaid }}€
                    </div>
                </div>
                <div class="line">
                    Montant restant salle :
                    <div class="data">
                        {{ item.totalAmountForGym -item.totalAmountForGymPaid }}€
                    </div>
                </div>
                <div class="line">
                    Total versé par le client :
                    <div class="data">
                        {{ item.totalAmountPaid }}€
                    </div>
                </div>
                <div class="line">
                    Séances ou mois restants:
                    <div class="data">
                        {{ item.sessionsMonthsLeft }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { mdiDelete } from "@mdi/js";

export default {
    name: "STablePack"
};
</script>

<script setup lang="ts">
import { query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { onMounted, ref } from "vue";
import { db, TPackCollection } from "@/firebase";
import { router } from "@/router";
import SButton from "@/design/form/SButton.vue";
import { useUserStore } from "@/stores/user";

const urlParams = new URLSearchParams(window.location.search);
const customerId = urlParams.get("customerId")?.toString();
const customerName = urlParams.get("customerName")?.toString();
const coachId = urlParams.get("coachId")?.toString();
type Pack = TPackCollection & { id: string }
const userStore = useUserStore();
const isAdmin = userStore.isAdmin;

const packs = ref<Pack[]>([]);
const dialog = ref(false);
const packNameDelete = ref("");
const packIdDelete = ref("");

async function goToPackView(id: string, name: string) {
    await router.push({ path: "/pack", query: { customerId, customerName, "packId": id, "packName": name } });
}

function openDialog(id: string, name: string){
    console.log(id);
    packNameDelete.value = name;
    packIdDelete.value = id;
    dialog.value = true;
}


const getPacks = async () => {
    const q = query(db.packs, where("coachId", "==", coachId), where("customerId", "==", customerId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        packs.value.push({
            ...doc.data(),
            id: doc.id
        });
    });

    packs.value.sort((packA, packB) => {
        return packB.sessionsMonthsLeft - packA.sessionsMonthsLeft;
    });
};

async function deletePack(){
    dialog.value = false;
    const packRef = doc(db.packs, packIdDelete.value);
    await deleteDoc(doc(db.packs, packIdDelete.value));
    packs.value = [];
    await getPacks();

}

onMounted(async () => {
    await getPacks();
});
</script>

<style scoped lang="scss">

.card-actions{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: var(--length-padding-m);
}
.table-coach {
    display: flex;
    flex-direction: column;
    gap: var(--length-gap-m);

    .card {
        padding: var(--length-padding-m);
        background: var(--color-background-light);
        border-radius: var(--length-radius-m);
        display: flex;
        flex-direction: column;
        gap: var(--length-gap-xs);
        cursor: pointer;


        .name {
            font-weight: bold;
            font-size: 1.25rem;
            display: flex;
            justify-content: space-between;
            .actions{
                display: flex;
            }
        }

        .info {
            display: flex;
            flex-direction: column;
        }

        .line{
            display: flex;
        }

        .data {
            margin: 0 var(--length-padding-xs);
            color: var(--color-content-softer);
        }
    }
}
</style>
