<template>
    <SBasicLayout>
        <div class="container">
            <SFormAddCoach />
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
    name: "SAddCoach"
};
</script>

<script setup lang="ts">
import SBackButton from "@/design/back-button/SBackButton.vue";
import SFormAddCoach from "@/pages/add-coach/form-add-coach/SFormAddCoach.vue";
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
