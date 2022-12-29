<template>
    <SBasicLayout>
        <div class="title">
            {{ customerName }}
            <div>
                {{ packName }}
            </div>
        </div>
        <div class="container">
            <SFormUpdatePack />
        </div>
        <template #footer>
            <div class="footer">
                <SBackButton
                    class="back-button"
                    primary
                >
                    Retour
                </SBackButton>
            </div>
        </template>
    </SBasicLayout>
</template>

<script lang="ts">
export default {
    name: "SPackLayout"
};
</script>

<script setup lang="ts">
import { ref } from "vue";
import SBasicLayout from "@/design/SBasicLayout.vue";
import SBackButton from "@/design/back-button/SBackButton.vue";
import SButton from "@/design/form/SButton.vue";
import SFormUpdatePack from "@/pages/pack/form-update-pack/SFormUpdatePack.vue";
const urlParams = new URLSearchParams(window.location.search);
const customerId = urlParams.get("customerId");
const customerName = urlParams.get("customerName");
const packId = urlParams.get("packId");
const packName = urlParams.get("packName");

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

.container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.footer {
    display: flex;
    width: 100%;
    justify-content: flex-end;
}
</style>
