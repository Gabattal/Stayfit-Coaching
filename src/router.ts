import { createRouter, createWebHistory } from "vue-router";
import SConnectionLayout from "./pages/connection/SLayout.vue";
import SHomeLayout from "@/pages/home/SHomeLayout.vue";
import SAdminLayout from "@/pages/admin/SAdminLayout.vue";
import SaddCustomer from "@/pages/add-customer/SaddCustomer.vue";
import SAddCoach from "@/pages/add-coach/SAddCoach.vue";
import SCoachLayout from "@/pages/coach/SCoachLayout.vue";
import SCustomerLayout from "@/pages/customer/SCustomerLayout.vue";
import SAddPack from "@/pages/add-pack/SAddPack.vue";
import SPackLayout from "@/pages/pack/SPackLayout.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { component: SConnectionLayout, path: "/" },
        { component: SHomeLayout, path: "/home" },
        { component: SAdminLayout, path: "/admin" },
        { component: SCoachLayout, path: "/coach" },
        { component: SCustomerLayout, path: "/customer" },
        { component: SPackLayout, path: "/pack" },
        { component: SaddCustomer, path: "/add-customer" },
        { component: SAddCoach, path: "/add-coach" },
        { component: SAddPack, path: "/add-pack" }
    ]
});
