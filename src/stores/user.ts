import { defineStore } from "pinia";
import { ref } from "vue";
import { User } from "firebase/auth";
import { useFirebaseAuth } from "vuefire";
import { doc, getDoc } from "firebase/firestore";
import { router } from "@/router";
import { usersRef } from "@/firebase";

export const useUserStore = defineStore("user", () => {
    const user = ref<User>();
    const auth = useFirebaseAuth();
    const isAdmin = ref(false);

    auth?.onAuthStateChanged(async (fireUser) => {
        user.value = fireUser ?? undefined;
        if (user.value) {
            isAdmin.value = await getUserAdmin(user.value?.uid);
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
        const userDoc = await getDoc(doc(usersRef, userId));
        return !!userDoc.data()?.isAdmin;
    }

    return {
        isAdmin,
        user
    };
});
