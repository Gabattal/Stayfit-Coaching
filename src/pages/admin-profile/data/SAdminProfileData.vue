<template>
    <div class="info">
        <div class="line">
            Nombre de coachings en cours:
            <div
                class="data"
            >
                {{ numberOfCoaching }}
            </div>
        </div>
    </div>
    <div class="info">
        <div class="line">
            Total coaching:
            <div
                class="data"
            >
                {{ totalCoaching }}€
            </div>
        </div>
    </div>
    <div class="info">
        <div class="line">
            Total part salle:
            <div
                class="data"
            >
                {{ totalForGym }}€
            </div>
        </div>
    </div>
    <div class="info">
        <div class="line">
            Total encaissé salle:
            <div
                class="data"
            >
                {{ totalForGymPaid }}€
            </div>
        </div>
    </div>
    <div class="info">
        <div class="line">
            Total restant à encaisser salle:
            <div
                class="data"
            >
                {{ totalForGymRemaining }}€
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "SAdminProfileData"
};
</script>

<script setup lang="ts">
import { query, getDocs } from "firebase/firestore";
import { onMounted, ref } from "vue";
import { db, TPackCollection } from "@/firebase";
const numberOfCoaching = ref(0);
const totalCoaching = ref(0);
const totalForGym = ref(0);
const totalForGymPaid = ref(0);
const totalForGymRemaining = ref(0);

async function getData(){
    const q = query(db.packs);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        if (doc.data().sessionsMonthsLeft > 0){
            numberOfCoaching.value++;
        }
        totalCoaching.value += doc.data().totalAmount;
        totalForGym.value += doc.data().totalAmountForGym;
        totalForGymPaid.value += doc.data().totalAmountForGymPaid;
    });
    totalForGymRemaining.value = totalForGym.value - totalForGymPaid.value;
}

onMounted(async () => {
    await getData();
});
</script>

<style scoped lang="scss">
.line{
    display: flex;
    margin: var(--length-margin-xs);
    .data{
        color: var(--color-content-softer);
        margin: 0 var(--length-margin-xs);
    }
}
</style>
