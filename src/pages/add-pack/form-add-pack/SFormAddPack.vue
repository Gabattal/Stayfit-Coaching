<template>
    <div class="form">
        <v-select
            v-model="selectPack"
            item-title="pack"
            :items="items"
            label="Pack"
            return-object
        />

        <v-select
            v-if="selectPack.pack==='SUNNY'"
            v-model="selectFormula"
            item-title="pack"
            item-value="value"
            :items="formulasMerry"
            return-object
        />
        <v-text-field
            v-if="selectPack.pack==='MERRY'"
            v-model="numberOfMonths"
            label="Nombre de mois"
            type="text"
        />
        <v-select
            v-if="selectPack.pack==='NAKAMA'"
            v-model="numberOfPeopleCoached"
            item-title="value"
            item-value="value"
            :items="numberOfPeople"
            label="Nombre de personnes"
            return-object
        />
        <v-text-field
            v-if="selectPack.pack==='NAKAMA'"
            v-model="numberOfSessions"
            label="Nombre de séances"
            type="text"
        />
        <v-text-field
            v-model="supplement"
            label="Supplément pour coach"
            type="text"
        />
        <div class="checkboxes">
            <v-checkbox
                v-model="isStudent"
                label="Étudiant"
            />
            <v-checkbox
                v-model="isAdherent"
                label="Adhérent"
            />
        </div>
        <SButton
            big
            primary
            @click="savePack"
        >
            Enregistrer
        </SButton>
    </div>
</template>

<script lang="ts">
export default {
    name: "SFormAddPack"
};
</script>

<script setup lang="ts">

import { ref } from "vue";
import { addDoc, collection, doc } from "firebase/firestore";
import SButton from "@/design/form/SButton.vue";
import { db, firestore } from "@/firebase";
import { router } from "@/router";

const supplement = ref(0);
const isStudent = ref(false);
const isAdherent = ref(false);
const selectPack = ref({ pack: "MERRY", value: "130" });
const numberOfMonths = ref(0);
const numberOfSessions = ref(0);
const numberOfPeopleCoached = ref({ value: 2 });
const totalAmountForGym = ref(0);
const totalAmountForCoach = ref(0);
const totalAmount = ref(0);
const packName = ref("");
let cost = 0;
const selectFormula = ref({ numberOfSessions: 1, pack: "1 Coaching", sessionValue: 90, totalValue: 90 });
const urlParams = new URLSearchParams(window.location.search);
const customerId = urlParams.get("customerId")?.toString();
const coachId = urlParams.get("coachId")?.toString();
const items = [
    { pack: "MERRY", value: 45 },
    { pack: "NAKAMA", value: 130 },
    { pack: "SUNNY" }
];

const numberOfPeople = [
    { value: 2 },
    { value: 3 },
    { value: 4 }
];

const formulasMerry = [
    { numberOfSessions: 1, pack: "1 Coaching", sessionValue: 90, totalValue: 90 },
    { numberOfSessions: 5, pack: "5 Coachings", sessionValue: 85, totalValue: 425 },
    { numberOfSessions: 10, pack: "10 Coachings", sessionValue: 80, totalValue: 800 },
    { numberOfSessions: 15, pack: "15 Coachings", sessionValue: 75, totalValue: 1125 },
    { numberOfSessions: 20, pack: "20 Coachings", sessionValue: 70, totalValue: 1400 },
    { numberOfSessions: 40, pack: "40 Coachings", sessionValue: 65, totalValue: 2600 },
    { numberOfSessions: 100, pack: "1 an de suivi complet", sessionValue: 60, totalValue: 6000 }
];

async function savePack() {
    if (customerId && coachId) {
        
        switch (selectPack.value.pack) {
        case "MERRY":
            cost = 130;
            if (!isAdherent.value) {
                cost += 5;
            }
            if (isStudent.value) {
                cost -= 5;
            }
            totalAmount.value = cost * numberOfMonths.value;
            totalAmountForCoach.value = (80 + Number(supplement.value)) * numberOfMonths.value;
            totalAmountForGym.value = totalAmount.value - totalAmountForCoach.value;
            packName.value = `MERRY : ${ numberOfMonths.value } mois`;
            break;
        case "NAKAMA":
            cost = 45;
            if (!isAdherent.value) {
                cost += 5;
            }
            if (isStudent.value) {
                cost -= 5;
            }
            totalAmount.value = cost * numberOfSessions.value * numberOfPeopleCoached.value.value;
            totalAmountForCoach.value = totalAmount.value / 2;
            totalAmountForGym.value = totalAmount.value / 2;
            packName.value = `NAKAMA : ${ numberOfSessions.value } séance(s) / ${ numberOfPeopleCoached.value.value } personnes`;
            break;
        case "SUNNY":
            cost = Number(selectFormula.value.sessionValue);
            if (!isAdherent.value) {
                cost += 5;
            }
            if (isStudent.value) {
                cost -= 5;
            }
            totalAmount.value = cost * Number(selectFormula.value.numberOfSessions);
            totalAmountForCoach.value = (40 + Number(supplement.value)) * selectFormula.value.numberOfSessions;
            totalAmountForGym.value = totalAmount.value - totalAmountForCoach.value;
            packName.value = `MERRY : ${ selectFormula.value.pack }`;
            break;
        }

        const sessionsMonthsLeft = numberOfMonths.value ? numberOfMonths.value : numberOfSessions.value;


        const data = {
            "coachId": coachId,
            "customerId": customerId,
            "packName": packName.value,
            "sessionsMonthsLeft": Number(sessionsMonthsLeft),
            "totalAmount": totalAmount.value,
            "totalAmountForCoach": totalAmountForCoach.value,
            "totalAmountForCoachPaid": 0,
            "totalAmountForGym": totalAmountForGym.value,
            "totalAmountForGymPaid": 0,
            "totalAmountPaid": 0
        };

        await addDoc(collection(firestore, "packs"), data);

        await router.go(-1);
    }
}
</script>

<style scoped lang="scss">
.form {
    width: 480px;
    max-width: calc(100% - 2 * var(--length-margin-m));
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.checkboxes {
    display: flex;
    flex-direction: row;
}
</style>
