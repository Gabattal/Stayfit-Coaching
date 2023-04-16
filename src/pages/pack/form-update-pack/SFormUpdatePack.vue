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
            Séances ou mois restants :
            <div class="data">
                {{ packData?.sessionsMonthsLeft }}
            </div>
        </div>
        <SButton
            v-if="!isAdmin"
            big
            primary
            @click="deductSession"
        >
            Déduire séance
        </SButton>
        <div v-if="isAdmin">
            <div class="info">
                Total versé :
                <div class="data">
                    {{ packData?.totalAmountPaid }} / {{ packData?.totalAmount }}€
                </div>
            </div>
            <v-text-field
                v-model.number="total"
                label="Total versé"
                type="number"
            />
            <div class="info">
                Total versé au coach :
                <div class="data">
                    {{ packData?.totalAmountForCoachPaid }} / {{ packData?.totalAmountForCoach }}€
                </div>
            </div>
            <v-text-field
                v-model.number="totalCoach"
                label="Total versé au coach"
                type="number"
            />
            <div class="info">
                Total versé à la salle :
                <div class="data">
                    {{ packData?.totalAmountForGymPaid }} / {{ packData?.totalAmountForGym }}€
                </div>
            </div>
            <v-text-field
                v-model.number="totalGym"
                label="Total versé à la salle"
                type="number"
            />
            <SButton
                big
                primary
                @click="updatePack"
            >
                Enregistrer
            </SButton>
        </div>
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
const customerId = urlParams.get("customerId")?.toString();
const packId = urlParams.get("packId")?.toString();
const snackbarState = ref(false);

const getPack = async () => {
    const packRef = doc(db.packs, packId);
    const packSnap = await getDoc(packRef);
    packData.value = packSnap.data();
    total.value = Number(packData.value?.totalAmountPaid);
    totalCoach.value = Number(packData.value?.totalAmountForCoachPaid);
    totalGym.value = Number(packData.value?.totalAmountForGymPaid);
};

async function updatePack(){

    const packRef = doc(db.packs, packId);
    try {
        if (Number(total.value) === packData.value?.totalAmount &&
            packData.value?.totalAmount !== packData.value?.totalAmountPaid){
            const customerRef = doc(db.customers, customerId);
            await updateDoc(customerRef, {
                numberOfPacksPaid: increment(1)
            });
        }
        if (Number(totalGym.value) === packData.value?.totalAmountForGym &&
            Number(totalCoach.value) === packData.value?.totalAmountForCoach &&
            (packData.value?.totalAmountForGymPaid !== packData.value?.totalAmountForGym &&
                packData.value?.totalAmountForCoachPaid !== packData.value?.totalAmountForCoach)){
            const customerRef = doc(db.customers, customerId);
            await updateDoc(customerRef, {
                numberOfPacksFullPaid: increment(1)
            });
        }
        await updateDoc(packRef, {
            totalAmountForCoachPaid: Number(totalCoach.value),
            totalAmountForGymPaid: Number(totalGym.value),
            totalAmountPaid: Number(total.value)
        });
        router.go(-1);
    }
    catch (error) {
        snackbarState.value = true;
    }

}

async function deductSession(){
    const packRef = doc(db.packs, packId);
    try {
        await updateDoc(packRef, {
            sessionsMonthsLeft: increment(-1)
        });
        router.go(-1);
    }
    catch (error) {
        snackbarState.value = true;
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
        display: flex;
    }
    .data {
        margin: 0 var(--length-padding-xs);
        color: var(--color-content-softer);
    }

}
</style>
