<template>
    <v-snackbar
        v-model="snackbarState"
        absolute
        color="red"
        location="top"
    >
        Il doit y avoir une incohérence dans le formulaire mon reuf.
    </v-snackbar>
    <div class="form">
        <div class="info">
            Séances ou mois restants : {{ packData?.sessionsMonthsLeft }}
        </div>
        <v-text-field
            v-model.number="sessions"
            label="Séance(s) effectuée(s) depuis la dernière fois"
            type="number"
        />
        <div v-if="isAdmin">
            <div class="info">
                Total versé : {{ packData?.totalAmountPaid }} / {{ packData?.totalAmount }}€
            </div>
            <v-text-field
                v-model.number="total"
                label="Dernier versement du client"
                type="number"
            />
            <div class="info">
                Total versé au coach : {{ packData?.totalAmountForCoachPaid }} / {{ packData?.totalAmountForCoach }}€
            </div>
            <v-text-field
                v-model.number="totalCoach"
                label="Dernier versement au coach"
                type="number"
            />
            <div class="info">
                Total versé à la salle : {{ packData?.totalAmountForGymPaid }} / {{ packData?.totalAmountForGym }}€
            </div>
            <v-text-field
                v-model.number="totalGym"
                label="Dernier versement à la salle"
                type="number"
            />
        </div>
        <SButton
            big
            primary
            @click="updatePack"
        >
            Enregistrer
        </SButton>
    </div>
</template>

<script lang="ts">
export default {
    name: "SFormUpdatePack"
};
</script>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { doc, updateDoc, increment, getDoc } from "firebase/firestore";
import { db, TPackCollection } from "@/firebase";
import SButton from "@/design/form/SButton.vue";
import { router } from "@/router";
import { useUserStore } from "@/stores/user";


const urlParams = new URLSearchParams(window.location.search);
const packData = ref<TPackCollection>();
const sessions = ref(0);
const total = ref(0);
const totalCoach = ref(0);
const totalGym = ref(0);
const userStore = useUserStore();
const isAdmin = userStore.isAdmin;
const packId = urlParams.get("packId")?.toString();
const snackbarState = ref(false);

const getPack = async () => {
    const packRef = doc(db.packs, packId);
    const packSnap = await getDoc(packRef);
    packData.value = packSnap.data();
};

async function updatePack(){
    if (sessions.value > packData.value?.sessionsMonthsLeft ||
        (total.value + packData.value?.totalAmountPaid) > packData.value?.totalAmount ||
        (totalGym.value + packData.value?.totalAmountForGymPaid) > packData.value?.totalAmountForGym ||
        (totalCoach.value + packData.value?.totalAmountForCoachPaid) > packData?.value?.totalAmountForCoach ||
        typeof sessions.value === "string" || typeof totalGym.value === "string" || typeof total.value === "string"
        || typeof totalCoach.value === "string"){
        snackbarState.value = true;
    }
    else {
        const packRef = doc(db.packs, packId);
        try {
            await updateDoc(packRef, {
                sessionsMonthsLeft: increment(-sessions.value),
                totalAmountForCoachPaid: increment(totalCoach.value),
                totalAmountForGymPaid: increment(totalGym.value),
                totalAmountPaid: increment(total.value)
            });
            router.go(-1);
        }
        catch (error) {
            snackbarState.value = true;
        }
    }
}

onMounted(async () => {
    await getPack();
});
</script>

<style scoped lang="scss">
.form {
    width: 480px;
    max-width: calc(100% - 2 * var(--length-margin-m));
    display: flex;
    flex-direction: column;
    justify-content: center;
    .info{
        margin: var(--length-margin-xs);
    }
}
</style>
