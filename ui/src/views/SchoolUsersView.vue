<script setup lang="ts">
import { ref } from 'vue';
import { NButton, NModal, NSlider, NInputNumber, NTag, NCard } from 'naive-ui';

const openCodeGeneratorModal = ref(false);
const codesCount = ref(0);

const generateCodes = () => {
    if (!(codesCount.value === 0)) {
        console.log(codesCount.value);
        openCodeGeneratorModal.value = false;
    }
};

const cancelGeneratingCodes = () => {
    codesCount.value = 0;
    openCodeGeneratorModal.value = false;
};
</script>

<template>
    <div class="school-users-wrapper">
        <div class="codes">
            <n-button type="success" size="large" @click="openCodeGeneratorModal = true">
                Generuj kod/y
            </n-button>
            <n-modal v-model:show="openCodeGeneratorModal">
                <n-card>
                    <template #header>Podaj ilość kodów do wygenerowania:
                    </template>
                    <div class="inputs">
                        <n-slider v-model:value="codesCount" :step="1" :min="0" :max="50" />
                        <n-input-number v-model:value="codesCount" size="small" :min="0" :max="50" />
                    </div>
                    <template #footer>
                        <div class="buttons">
                            <n-button type="success" size="large" @click="generateCodes">
                                Generuj
                            </n-button>
                            <n-button type="error" size="large" @click="cancelGeneratingCodes">
                                Anuluj
                            </n-button>
                        </div>
                    </template>
                </n-card>
            </n-modal>
        </div>
        <div class="vertical-divider special">
        </div>
        <div class="students">
            <n-tag size='large'>
                Zarejestrowani uczniowie
            </n-tag>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.school-users-wrapper {
    margin-top: 1.5rem;
    display: flex;
    justify-content: space-around;
    gap: 2rem;
    min-height: 80vh;

    .codes {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .special {
        top: 5%;
        left: calc(50% - 1px);
        width: 5px;
        height: 90%;
    }
}

.n-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 2.5rem;
    max-width: 500px;

    .inputs {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }
}
</style>