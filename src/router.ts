import { createRouter, createWebHashHistory } from "vue-router";
import SConnectionLayout from "./pages/connection/SLayout.vue";
import SHomeLayout from "@/pages/home/SHomeLayout.vue";

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { component: SConnectionLayout, path: "/" },
        { component: SHomeLayout, path: "/home" }
    ]
});
