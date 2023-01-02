<template>
    <SBasicLayout>
        <div class="title">
            {{ customerName }}
            <div>
                Informations personnelles
            </div>
        </div>
        <div class="container">
            <SCustomerData />
        </div>
        <template #footer>
            <div class="footer">
                <SBackButton class="button" />
            </div>
        </template>
    </SBasicLayout>
</template>

<script lang="ts">
export default {
    name: "SCustomerProfile"
};
</script>

<script setup lang="ts">

import SBackButton from "@/design/back-button/SBackButton.vue";
import SBasicLayout from "@/design/SBasicLayout.vue";
import SCustomerData from "@/pages/customer-profile/data/SCustomerData.vue";

const urlParams = new URLSearchParams(window.location.search);
const customerName = urlParams.get("customerName")?.toString();
</script>

<style scoped lang="scss">
.title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: var(--length-margin-xs);
    font-weight: bold;
}

.footer{
    width: 100%;
    display: flex;
    justify-content: flex-end;
}
</style>
