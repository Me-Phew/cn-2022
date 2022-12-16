<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from 'vue-router';
import axios, { AxiosError } from 'axios';
import {
  NSteps,
  NStep,
  NCollapseTransition,
  NButton,
  useMessage,
} from "naive-ui";
import TheSchoolSignUp from "@/components/TheSchoolSignUp.vue";
import TheEnsureSchoolDataCorrect from "@/components/TheEnsureSchoolDataCorrect.vue";
import { handleRequestError } from '@/helpers';
import type { SchoolSignUp } from "@/components/TheSchoolSignUp.vue";

const router = useRouter();
const message = useMessage();

const schoolData = ref<SchoolSignUp | null>(null);

const current = ref(1);

const prevStep = () => {
  if (current.value > 1) current.value--;
};

const nextStep = () => {
  if (current.value < 2) current.value++;
};

const completeRegistration = (data: SchoolSignUp) => {
  schoolData.value = data;
  nextStep();
}

const handleSubmit = async () => {
  const schoolCreationMessage = message.create("Tworzenie szkoły", {
    type: "loading",
    duration: 0,
  });
  try {
    const response = await axios.post('school', {
      ...schoolData.value,
      'passwordConfirm': schoolData.value?.reenteredPassword
    });
    if (response.status === 200) {
      schoolCreationMessage.type = 'success';
      schoolCreationMessage.content = 'Szkoła została utworzona';
      router.push({ name: 'home' });
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const response = handleRequestError(error);
      schoolCreationMessage.type = 'error';
      schoolCreationMessage.content = `Nie udało się utworzyć szkoły (status: ${response.status}, ${response.data?.message!})`;
    }
  }
  setTimeout(() => {
    schoolCreationMessage.destroy();
  }, 2000);
}
</script>

<template>
  <div class="student-sign-up sign-up">
    <h2 class="text-accent">Zarejestruj swoją placówkę edukacyjną</h2>
    <n-steps vertical :current="current" status="process">
      <n-step title="Rejestracja">
        <n-collapse-transition :show="current === 1">
          <div>
            <p class="step-description">Podaj dane swojej placówki</p>
            <TheSchoolSignUp @completed="completeRegistration" />
          </div>
        </n-collapse-transition>
      </n-step>
      <n-step title="Przesłanie wniosku">
        <n-collapse-transition :show="current === 2">
          <div>
            <p class="step-description">
              Zweryfikuj poprawność danych i prześlij wniosek o aktywację konta
            </p>
            <TheEnsureSchoolDataCorrect :schoolData="schoolData" />
            <div class="submit-wrapper">
              <n-button round type="info" @click="prevStep">
                Zmień dane
              </n-button>
              <n-button round type="primary" @click="handleSubmit">
                Zarejestruj
              </n-button>
            </div>
          </div>
        </n-collapse-transition>
      </n-step>
    </n-steps>
    <router-link class="return" :to="{ name: 'home' }">Powrót</router-link>
  </div>
</template>

<style scoped lang="scss">
.submit-wrapper {
  display: flex;
  gap: 1rem;
}
</style>
