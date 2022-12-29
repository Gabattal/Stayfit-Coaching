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
import SCustomerProfile from "@/pages/customer-profile/SCustomerProfile.vue";
import SCoachProfileLayout from "@/pages/coach-profile/SCoachProfileLayout.vue";
import SAdminProfileLayout from "@/pages/admin-profile/SAdminProfileLayout.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { component: SConnectionLayout, path: "/" },
        { component: SHomeLayout, path: "/home" },
        { component: SAdminLayout, path: "/admin" },
        { component: SAdminProfileLayout, path: "/admin-profile" },
        { component: SCoachLayout, path: "/coach" },
        { component: SCoachProfileLayout, path: "/coach-profile" },
        { component: SCustomerLayout, path: "/customer" },
        { component: SCustomerProfile, path: "/customer-profile" },
        { component: SPackLayout, path: "/pack" },
        { component: SaddCustomer, path: "/add-customer" },
        { component: SAddCoach, path: "/add-coach" },
        { component: SAddPack, path: "/add-pack" }
    ]
});
