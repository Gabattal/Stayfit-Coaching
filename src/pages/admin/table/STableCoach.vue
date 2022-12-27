<template>
    <div class="table-coach">
        <div
            v-for="item in coaches"
            :key="item.id"
            class="card"
        >
            <div
                class="name"
                @click="goToCoachView(item.id)"
            >
                {{ item.last_name }} {{ item.first_name }}
            </div>
            <div class="info">
                <a
                    class="mail"
                    :href="`mailto:${item.mail}`"
                >
                    {{ item.mail }}
                </a>
                <a
                    class="phone"
                    :href="`tel:${item.phone}`"
                >
                    {{ item.phone }}
                </a>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
export default {
    name: "STableCoach",
    coaches: "test"
};
</script>

<script setup lang="ts">
import { query, where, getDocs } from "firebase/firestore";
import { onMounted, ref } from "vue";
import { usersRef } from "@/firebase";
import { router } from "@/router";

type Coach = {
    id: string; first_name: string; isAdmin: boolean; last_name: string; mail: string; phone: string;
}
const coaches = ref<Coach[]>([]);

async function goToCoachView(id: string) {
    await router.push({ path: "/coach", query: { coachId: id } });
}

const getCoaches = async () => {
    const q = query(usersRef, where("isAdmin", "==", false));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        coaches.value.push({
            ...doc.data(),
            id: doc.id
        });
    });

    coaches.value.sort((coachA, coachB) => coachA.last_name.localeCompare(coachB.last_name));
};

onMounted(async () => {
    await getCoaches();
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
        cursor: pointer;
        border-radius: var(--length-radius-m);
        display: flex;
        flex-direction: column;
        gap: var(--length-gap-xs);

        .name{
            font-weight: bold;
            font-size: 1.25rem;
        }

        .info {
            color : var(--color-content-softer);
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>
