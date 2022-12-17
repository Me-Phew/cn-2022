<script setup lang="ts">
import { ref } from "vue";
import { NSteps, NStep, NCollapseTransition, NButton, useMessage } from "naive-ui";
import ProvideVerificationCodeItem from "@/components/ProvideVerificationCodeItem.vue";
import TheUserSignUp from "@/components/TheUserSignUp.vue";
import axios, { AxiosError } from 'axios';
import { handleRequestError } from "@/helpers";
import { useRouter } from 'vue-router';

export interface StudentSignUp {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
  reenteredPassword: string | null;
}

const router = useRouter();
const current = ref(1);
const message = useMessage();

const studentSignUp = ref<StudentSignUp>({
  firstName: null,
  lastName: null,
  email: null,
  password: null,
  reenteredPassword: null,
});

const prev = () => {
  if (current.value > 1) current.value--;
};

const next = () => {
  if (current.value < 3) current.value++;
};

const signup = async () => {
  const studentAccountCreationMessage = message.create("Tworzenie konta ucznia", {
    type: "loading",
    duration: 0,
  });
  try {
    const response = await axios.post('school', {
      ...studentSignUp.value,
      'passwordConfirm': studentSignUp.value?.reenteredPassword
    });
    if (response.status === 200) {
      studentAccountCreationMessage.type = 'success';
      studentAccountCreationMessage.content = 'Konto użytkownika został utworzone';
      router.push({ name: 'home' });
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const response = handleRequestError(error);
      studentAccountCreationMessage.type = 'error';
      if (response) {
        studentAccountCreationMessage.content = `Nie udało się utworzyć konta użytkownika (status: ${response.status}, ${response.data?.message!})`;
      } else {
        studentAccountCreationMessage.content = 'Nie udało się utworzyć konta użytkownika (status: nieznany)';
      }
    }
  }
  setTimeout(() => {
    studentAccountCreationMessage.destroy();
  }, 2000);
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
      <n-step title="Przesłanie wniosku">
        <n-collapse-transition :show="current === 3">
          <div class="n-step-description">
            <p>
              Zweryfikuj poprawność danych i prześlij wniosek o aktywację konta
            </p>
          </div>
          <n-button type="success" @click="signup">Prześlij wniosek</n-button>
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
