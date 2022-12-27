import { createRouter, createWebHistory } from "vue-router";
import SConnectionLayout from "./pages/connection/SLayout.vue";
import SHomeLayout from "@/pages/home/SHomeLayout.vue";
import SAdminLayout from "@/pages/admin/SAdminLayout.vue";
import SaddCustomer from "@/pages/add-customer/SaddCustomer.vue";
import SaddCoach from "@/pages/add-coach/SaddCoach.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { component: SConnectionLayout, path: "/" },
        { component: SHomeLayout, path: "/home" },
        { component: SAdminLayout, path: "/admin" },
        { component: SaddCustomer, path: "/add-customer" },
        { component: SaddCoach, path: "/add-coach" }
    ]
});
