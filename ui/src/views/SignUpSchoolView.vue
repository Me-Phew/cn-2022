<script setup lang="ts">
import { ref } from "vue";
import axios from 'axios';
import {
  NSteps,
  NStep,
  NCollapseTransition,
  NButton,
} from "naive-ui";
import TheSchoolSignUp from "@/components/TheSchoolSignUp.vue";
import TheEnsureSchoolDataCorrect from "@/components/TheEnsureSchoolDataCorrect.vue";
import type { SchoolSignUp } from "@/components/TheSchoolSignUp.vue";

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
  // 
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
