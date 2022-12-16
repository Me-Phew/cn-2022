<script setup lang="ts">
import { ref } from "vue";
import { NSteps, NStep, NCollapseTransition } from "naive-ui";
import ProvideVerificationCodeItem from "@/components/ProvideVerificationCodeItem.vue";
import ProvideVerificationDocumentsItem from "@/components/ProvideVerificationDocumentsItem.vue";
import TheUserSignUp from "@/components/TheUserSignUp.vue";

const current = ref(1);

const prev = () => {
  if (current.value > 1) current.value--;
};

const next = () => {
  if (current.value < 4) current.value++;
};
</script>

<template>
  <div class="student-sign-up sign-up">
    <h1 class="text-accent">
      Utwórz swoje konto ucznia
    </h1>
    <n-steps vertical :current="current" status="process">
      <n-step title="Weryfikacja dostępu">
        <n-collapse-transition :show="current === 1">
          <div class="n-step-description">
            <p>
              Potwierdź swój dostęp, podając kod dostarczony przez twoją szkołę
            </p>
            <ProvideVerificationCodeItem requiredCodeType="school" @completed="next" />
          </div>
        </n-collapse-transition>
      </n-step>
      <n-step title="Rejestracja">
        <n-collapse-transition :show="current === 2">
          <div class="n-step-description">
            <p>Podaj swoje dane osobowe</p>
            <TheUserSignUp @completed="next" />
          </div>
        </n-collapse-transition>
      </n-step>
      <n-step title="Weryfikacja tożsamości">
        <n-collapse-transition :show="current === 3">
          <div class="n-step-description">
            <p>Prześlij dokumenty wymagane do weryfikacji tożsamoście</p>
            <ProvideVerificationDocumentsItem />
          </div>
        </n-collapse-transition>
      </n-step>
      <n-step title="Przesłanie wniosku">
        <n-collapse-transition :show="current === 4">
          <div class="n-step-description">
            <p>
              Zweryfikuj poprawność danych i prześlij wniosek o aktywację konta
            </p>
          </div>
        </n-collapse-transition>
      </n-step>
    </n-steps>
    <router-link class="return" :to="{ name: 'home' }">
      Powrót
    </router-link>
  </div>
</template>

<style scoped lang="scss">

</style>
