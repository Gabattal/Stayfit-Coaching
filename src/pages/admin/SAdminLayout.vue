<template>
    <SHeader />
    <div class="addButon">
        <v-row>
            <v-col>
                <v-btn
                    color="info"
                    icon="mdi-plus-thick"
                    @click="addCoach"
                />
            </v-col>
        </v-row>
    </div>
    <STableCoach />
</template>

<script lang="ts">
export default {
    name: "SAdminLayout"
};
</script>

<script setup lang="ts">
import SHeader from "@/design/header/SHeader.vue";
import STableCoach from "@/pages/admin/table/STableCoach.vue";
import { router } from "@/router";

async function addCoach(){
    await router.push("/add-coach");
}
</script>

<style scoped lang="scss">
 .addButon{
     padding: var(--length-padding-m);
 }
</style>
