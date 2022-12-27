<template>
    <SBasicLayout>
        <div class="container">
            <SFormAddCustomer />
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
    name: "SaddCustomer"
};
</script>

<script setup lang="ts">

import SHeader from "@/design/header/SHeader.vue";
import SBackButton from "@/design/back-button/SBackButton.vue";
import SFormAddCustomer from "@/pages/add-customer/form-add-customer/SFormAddCustomer.vue";
import SBasicLayout from "@/design/SBasicLayout.vue";
</script>

<style scoped lang="scss">
.container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}
</style>
