<template>
    <div class="table-coach">
        <div
            v-for="item in packs"
            :key="item.id"
            class="card"
        >
            <div
                class="name"
                @click="goToCoachView(item.id ,(item.last_name+' '+item.first_name))"
            >
                {{ item.packName }}
            </div>
            <div class="info">
                <div>
                    Montant restant coach: {{ item.totalAmountForCoach }}€
                </div>
                <div>
                    Montant restant salle : {{ item.totalAmountForGym }}€
                </div>
                <div>
                    Versé : 0€
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
import { query, where, getDocs, collection, doc } from "firebase/firestore";
import { onMounted, ref } from "vue";
import { db, firestore, TPackCollection, TUserCollection } from "@/firebase";
import { router } from "@/router";
import { displayPhone } from "@/lib/user";
const urlParams = new URLSearchParams(window.location.search);
const customerId = urlParams.get("customerId")?.toString();
const coachId = urlParams.get("coachId")?.toString();
type Pack = TPackCollection& {id: string}

const packs = ref<Pack[]>([]);

async function goToCoachView(id: string, name: string) {
    await router.push({ path: "/coach", query: { coachId: id, coachName: name } });
}


const getCoaches = async () => {
    const q = query(collection(firestore, "users", coachId, "customers",customerId,"packs"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        packs.value.push({
            ...doc.data(),
            id: doc.id
        });
    });

    packs.value.sort((packA, packB) => packA.packName.localeCompare(packB.packName));
};

onMounted(async () => {
    await getCoaches();
    console.log(packs.value);
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


        .name{
            font-weight: bold;
            font-size: 1.25rem;
            cursor: pointer;
        }

        .info {
            color : var(--color-content-softer);
            display: flex;
            flex-direction: column;
        }
    }
}
</style>
