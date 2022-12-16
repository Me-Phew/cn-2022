<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import type {
  FormInst,
  FormItemRule,
  FormValidationError,
  FormRules,
} from "naive-ui";
import { useMessage, NFormItem, NForm, NInput, NButton } from "naive-ui";
import { validateEmail } from "@/helpers";

const router = useRouter();

const formRef = ref<FormInst | null>(null);

interface ModelType {
  email: string | null;
  password: string | null;
}

const model = ref<ModelType>({
  email: null,
  password: null,
});

const message = useMessage();

const logIn = () => {
  formRef.value?.validate((errors: Array<FormValidationError> | undefined) => {
    if (!errors) {
      const loadingMessage = message.create("Logowanie", {
        type: "loading",
        duration: 0,
      });
      // todo: login
      setTimeout(() => {
        router.push({ name: "dashboardStudent" });
        loadingMessage.destroy();
      }, 1500);
    } else {
      message.error("Najpierw należy poprawnie uzupełnić formularz");
    }
  });
};

const rules: FormRules = {
  email: [
    {
      required: true,
      validator(_rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("Podaj swój adres email");
        } else if (!validateEmail(value)) {
          return new Error("Podaj poprawny adres email");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
  password: [
    {
      required: true,
      validator(_rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("Podaj swoje hasło");
        } else if (!(value.length >= 8)) {
          return new Error("Hasło musi składać się z przynajmniej 8 znaków");
        } else if (!/[a-z]+/.test(value)) {
          return new Error("Hasło musi zawierać małą literę");
        } else if (!/[A-Z]+/.test(value)) {
          return new Error("Hasło musi zawierać dużą literę");
        } else if (!/[0-9]+/.test(value)) {
          return new Error("Hasło musi zawierać cyfrę");
        } else if (!/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]+/.test(value)) {
          return new Error("Hasło musi zawierać znak specjalny");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
};
</script>

<template>
  <n-form ref="formRef" :model="model" :rules="rules">
    <n-form-item path="email" label="E-mail">
      <n-input v-model:value="model.email" type="text" placeholder="user@example.com"
        @keydown.enter.prevent="logIn" :input-props="{
          autocomplete: 'email',
        }" />
    </n-form-item>
    <n-form-item path="password" label="Hasło">
      <n-input v-model:value="model.password" type="password" placeholder="••••••••"
        @keydown.enter.prevent="logIn" :input-props="{
          autocomplete: 'password',
        }" />
    </n-form-item>
    <div class="button-wrapper">
      <n-button round type="primary" @click.prevent="logIn">
        Zaloguj się
      </n-button>
    </div>
  </n-form>
</template>

<style scoped lang="scss">

</style>
