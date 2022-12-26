import { defineStore } from "pinia";
import { ref } from "vue";
import { User } from "firebase/auth";
import { useFirebaseAuth } from "vuefire";
import { router } from "@/router";

export const useUserStore = defineStore("user", () => {
    const user = ref<User>();

    const auth = useFirebaseAuth();

    auth?.onAuthStateChanged(async (fireUser) => {
        user.value = fireUser ?? undefined;
        await updateLocation();
    });

    async function updateLocation() {
        const path = router.currentRoute.value.path;
        const isLoginPage = path === "/";

        if (user.value && isLoginPage) {
            await router.push("/home");
        }
        else {
            await router.push("/");
        }
    }

    return {
        user
    };
});
