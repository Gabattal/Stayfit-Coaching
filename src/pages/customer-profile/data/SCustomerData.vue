<template>
    <div class="info">
        <div class="line">
            <div class="title">
                Objectif(s):
            </div>
            <div v-for="objective in customerData?.objectives">
                <div
                    v-if="objective!=='Autres / Préciser'"
                    class="data"
                >
                    {{ objective }}
                </div>
            </div>
        </div>

        <div
            v-if="customerData?.objectivePrecision"
            class="line"
        >
            <div class="title">
                Précision objectif:
            </div>
            <div
                v-if="objective!=='Autres / Préciser'"
                class="data"
            >
                {{ customerData?.objectivePrecision }}
            </div>
        </div>

        <div class="line">
            <div class="title">
                Problème(s) de santé :
            </div>
            <div v-for="disease in customerData?.diseases">
                <div
                    v-if="disease!=='Autres / Préciser'"
                    class="data"
                >
                    {{ disease }}
                </div>
            </div>
        </div>

        <div
            v-if="customerData?.diseasePrecision"
            class="line"
        >
            <div class="title">
                Précision problème de santé:
            </div>
            <div
                v-if="objective!=='Autres / Préciser'"
                class="data"
            >
                {{ customerData?.diseasePrecision }}
            </div>
        </div>

        <div
            class="line"
        >
            <div class="title">
                Disponibilités:
            </div>
            <div v-for="availability in customerData?.availabilities">
                <div
                    class="data"
                >
                    {{ availability }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "SCustomerData"
};
</script>

<script setup lang="ts">
import { doc, getDoc } from "firebase/firestore";
import { onMounted, ref } from "vue";
import { db, TCustomerCollection } from "@/firebase";
type Customer = TCustomerCollection;
const customerData = ref<Customer>();

const urlParams = new URLSearchParams(window.location.search);
const customerId = urlParams.get("customerId")?.toString();

const getCustomerData = async () => {
    const userDoc = await getDoc(doc(db.customers, customerId));
    customerData.value = userDoc.data();
};

onMounted(async () => {
    await getCustomerData();
});

</script>

<style scoped lang="scss">

.line{
    display: flex;
    flex-direction: column;
    margin: var(--length-margin-xs);
    .title{
        font-weight: bold;
    }
    .data{
        color: var(--color-content-softer);
    }
}
</style>
