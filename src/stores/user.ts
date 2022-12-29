import { defineStore } from "pinia";
import { ref } from "vue";
import { User } from "firebase/auth";
import { useFirebaseAuth } from "vuefire";
import { doc, getDoc } from "firebase/firestore";
import { router } from "@/router";
import { db } from "@/firebase";

export const useUserStore = defineStore("user", () => {
    const user = ref<User>();
    const auth = useFirebaseAuth();
    const isAdmin = ref(false);
    const userName = ref("");

    auth?.onAuthStateChanged(async (fireUser) => {
        user.value = fireUser ?? undefined;
        if (user.value) {
            isAdmin.value = await getUserAdmin(user.value?.uid);
            userName.value = await getUserName(user.value?.uid);
        }
        await updateLocation();
    });


    async function updateLocation() {
        const path = router.currentRoute.value.path;

        const isLoginPage = path === "/";

        if (user.value && isLoginPage) {
            if (isAdmin.value){
                await router.push("/admin");
            }
            else {
                await router.push("/home");
            }
        }
        else if (!user.value && !isLoginPage) {
            await router.push("/");
        }
    }

    async function getUserAdmin(userId: string) {
        const userDoc = await getDoc(doc(db.users, userId));
        return !!userDoc.data()?.isAdmin;
    }

    async function getUserName(userId: string) {
        const userDoc = await getDoc(doc(db.users, userId));
        return `${ userDoc.data()?.last_name } ${ userDoc.data()?.first_name }`;
    }

    return {
        isAdmin,
        user,
        userName
    };
});
