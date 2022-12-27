import { createRouter, createWebHistory } from "vue-router";
import SConnectionLayout from "./pages/connection/SLayout.vue";
import SHomeLayout from "@/pages/home/SHomeLayout.vue";
import SAdminLayout from "@/pages/admin/SAdminLayout.vue";
import SaddCustomer from "@/pages/add-customer/SaddCustomer.vue";
import SAddCoach from "@/pages/add-coach/SAddCoach.vue";
import SCoachLayout from "@/pages/coach/SCoachLayout.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { component: SConnectionLayout, path: "/" },
        { component: SHomeLayout, path: "/home" },
        { component: SAdminLayout, path: "/admin" },
        { component: SCoachLayout, path: "/coach" },
        { component: SaddCustomer, path: "/add-customer" },
        { component: SAddCoach, path: "/add-coach" }
    ]
});
