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
            Total encaissé:
            <div
                class="data"
            >
                {{ totalPaid }}€
            </div>
        </div>
    </div>
    <div class="info">
        <div class="line">
            Total restant à encaisser coach:
            <div
                class="data"
            >
                {{ totalForGCoachRemaining }}€
            </div>
        </div>
    </div>
    <div class="info">
        <div class="line">
            Total restant à reverser salle:
            <div
                class="data"
            >
                {{ totalForGymToPay }}€
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "SCoachingProfileData"
};
</script>

<script setup lang="ts">
import { getDocs, query, where } from "firebase/firestore";
import { onMounted, ref } from "vue";
import { db, TPackCollection } from "@/firebase";
const urlParams = new URLSearchParams(window.location.search);
const coachId = urlParams.get("coachId");
const numberOfCoaching = ref(0);
const totalCoaching = ref(0);
const totalForGym = ref(0);
const totalForGymPaid = ref(0);
const totalPaid = ref(0);
const totalForCoach = ref(0);
const totalForCoachPaid = ref(0);
const totalForGCoachRemaining = ref(0);
const totalForGymToPay = ref(0);

async function getData(){
    const q = query(db.packs,where("coachId","==", coachId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        if (Number(doc.data().sessionsMonthsLeft) > 0){
            numberOfCoaching.value++;
        }
        totalPaid.value += Number(doc.data().totalAmountPaid);
        totalForCoach.value += Number(doc.data().totalAmountForCoach);
        totalCoaching.value += Number(doc.data().totalAmount);
        totalForCoachPaid.value += Number(doc.data().totalAmountForCoachPaid);
        totalForGym.value += Number(doc.data().totalAmountForGym);
        totalForGymPaid.value += Number(doc.data().totalAmountForGymPaid);
    });
    totalForGCoachRemaining.value = Number(totalForCoach.value - totalForCoachPaid.value);
    totalForGymToPay.value = Number(totalForGym.value - totalForGymPaid.value);
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
