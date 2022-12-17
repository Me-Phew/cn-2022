<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useClipboard } from '@vueuse/core'
import { NButton, NModal, NSlider, NInputNumber, NTag, NCard, useMessage } from 'naive-ui';
import axios, { AxiosError } from 'axios';
import { handleRequestError } from '@/helpers';

const openCodeGeneratorModal = ref(false);
const codesCount = ref(0);
const message = useMessage();
const codes = ref<any[]>([]);

const fetchCodes = async () => {
    try {
        const response = await axios.get('school/get-codes')
        codes.value = response.data.codes;
        console.log(codes.value);
    } catch (error) {
        if (error instanceof AxiosError) {
            const response = handleRequestError(error);
            if (response) {
                message.error(`Nie udało się pobrać kodu/ów, status: ${response.status}, ${response.data?.message!}`)
            } else {
                message.error('Nie udało się pobrać kodów, status nieznany.');
            }
        }
    }
};

const generateCodes = async () => {
    if (!(codesCount.value === 0)) {
        try {
            await axios.post('school/generate-codes', {
                amount: codesCount.value,
            });
            message.success("Udało się wygenerować kody.");
            await fetchCodes();
            codesCount.value = 0;
            openCodeGeneratorModal.value = false;
        } catch (error) {
            if (error instanceof AxiosError) {
                const response = handleRequestError(error);
                if (response) {
                    message.error(`Nie udało się wygenerować kodu/ów, status: ${response.status}, ${response.data?.message!}`)
                } else {
                    message.error('Nie udało się wygenerować kodów, status nieznany.');
                }
            }
        }
    }
};

onMounted(async () => {
    await fetchCodes();
});

const cancelGeneratingCodes = () => {
    codesCount.value = 0;
    openCodeGeneratorModal.value = false;
};
</script>

<template>
    <div class="school-users-wrapper">
        <div class="codes-wrapper">
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
            <div class="codes-list" v-if="codes.length > 0">
                <n-tag type="warning" size="large">Pamiętaj aby nie udostępniać kodów osobom nieupoważnionym!</n-tag>
                <div class="codes" v-for="code in codes" :key="code.id">
                    <n-tag :type="code.wasUsed ? 'error' : 'success'">{{ code.value }}</n-tag>
                </div>
            </div>
            <div class="no-codes" v-else>
                <n-tag type="info" size=large>Brak wygenerowanych kodów, kliknij przycisk u góry aby to zrobić</n-tag>
            </div>
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

    .codes-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;

        .codes-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-items: center;
            padding: 5rem 0;
        }

        .no-codes {
            margin-top: 75%;
        }
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