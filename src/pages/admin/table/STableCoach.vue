
<template>
    <Suspense>
        <template #default>
            <div>
                <v-table
                    fixed-header
                    theme="customTheme"
                >
                    <thead>
                        <tr>
                            <th class="text-center">
                                Nom
                            </th>
                            <th class="text-center">
                                Prénom
                            </th>
                            <th class="text-center">
                                Mail
                            </th>
                            <th class="text-center">
                                Téléphone
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="item in coaches"
                            :key="item.id"
                        >
                            <td
                                class="text-center name"
                                @click="goToCoachView(item.id)"
                            >
                                {{ item.last_name }}
                            </td>
                            <td class="text-center">
                                {{ item.first_name }}
                            </td>
                            <td class="text-center">
                                {{ item.mail }}
                            </td>
                            <td class="text-center">
                                {{ item.phone }}
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </div>
        </template>
        <template #fallback>
            loading
        </template>
    </Suspense>
</template>




<script lang="ts">
export default {
    name: "STableCoach",
    coaches: "test"
};
</script>

<script setup lang="ts">
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
type Coach = {
    id: string; first_name: string; isAdmin: boolean; last_name: string; mail: string; phone: string;
}
const coaches: Coach[] = [];

function goToCoachView(id: string){
    console.log(id);
}

const getCoaches = async () => {
    const q = query(collection(db, "users"), where("isAdmin", "==", false));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const data = {
            "id": doc.id,
            "first_name": doc.data().first_name,
            "isAdmin": doc.data().isAdmin,
            "last_name": doc.data().last_name,
            "mail": doc.data().mail,
            "phone": doc.data().phone
        };
        coaches.push(data);
    });
};

await getCoaches();
console.log(coaches);
</script>

<style scoped lang="scss">
.name{
    cursor: pointer;
    &:hover{
        color: var(--color-content-softer)
    }
}
</style>
