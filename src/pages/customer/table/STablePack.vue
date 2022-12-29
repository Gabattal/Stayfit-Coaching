<template>
    <div class="table-coach">
        <div
            v-for="item in packs"
            :key="item.id"
            class="card"
            @click="goToPackView(item.id ,item.packName)"
        >
            <div
                class="name"
            >
                {{ item.packName }}
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
export default {
    name: "STablePack"
};
</script>

<script setup lang="ts">
import { query, where, getDocs } from "firebase/firestore";
import { onMounted, ref } from "vue";
import { db, TPackCollection } from "@/firebase";
import { router } from "@/router";

const urlParams = new URLSearchParams(window.location.search);
const customerId = urlParams.get("customerId")?.toString();
const customerName = urlParams.get("customerName")?.toString();
const coachId = urlParams.get("coachId")?.toString();
type Pack = TPackCollection & { id: string }

const packs = ref<Pack[]>([]);

async function goToPackView(id: string, name: string) {
    await router.push({ path: "/pack", query: { customerId, customerName, "packId": id, "packName": name } });
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

onMounted(async () => {
    await getPacks();
});
</script>

<style scoped lang="scss">
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
