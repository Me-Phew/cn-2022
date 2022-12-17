<script setup lang="ts">
import { ref } from 'vue';
import { NButton, NModal, NSlider, NInputNumber } from 'naive-ui';

const openCodeGeneratorModal = ref(false);
const codesCount = ref(0);

const generateCodes = () => {
    console.log(codesCount.value);
    openCodeGeneratorModal.value = false;
};
</script>

<template>
    <div class="school-users-wrapper">
        <n-button type="success" size="large" @click="openCodeGeneratorModal = true">
            Generuj kod/y
        </n-button>
        <n-modal v-model:show="openCodeGeneratorModal">
            <div class="modal-content">
                <h3>Podaj ilość kodów do wygenerowania:</h3>
                <n-slider v-model:value="codesCount" :step="1" :min="0" :max="50" />
                <n-input-number v-model:value="codesCount" size="small" :min="0" :max="50" />
                <div class="buttons">
                    <n-button type="success" size="large" @click="generateCodes">
                        Generuj
                    </n-button>
                    <n-button type="error" size="large" @click="openCodeGeneratorModal = false">
                        Anuluj
                    </n-button>
                </div>
            </div>
        </n-modal>
    </div>
</template>

<style lang="scss" scoped>
.school-users-wrapper {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
}

.modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 5rem;

    .buttons {
        display: flex;
        gap: 1rem;
    }
}
</style>