<script setup lang="ts">
import { ref } from "vue";
import type {
  FormRules,
  FormItemRule,
  FormInst,
  FormValidationError,
} from "naive-ui";
import { NForm, NFormItem, NInput, NButton, useMessage } from "naive-ui";

defineProps<{
  requiredCodeType: string;
}>();

const emit = defineEmits(["completed"]);

const form = ref<FormInst | null>(null);

interface ModelType {
  verificationCode: string | null;
}

const model = ref<ModelType>({
  verificationCode: "ANS21438", // todo: delete placeholder
});

const rules: FormRules = {
  verificationCode: [
    {
      required: true,
      validator(_rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("Kod weryfikacyjny jest wymagany");
        } else if (!(value.length === 8)) {
          return new Error("Podany kod weryfikacyjny jest nieprawidłowy");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
};

const trimTrailingWhitespace = () => {
  model.value.verificationCode = model.value.verificationCode?.trim() ?? "";
};

const message = useMessage();

const loading = ref<boolean>(false);

const handleSubmit = () => {
  form.value?.validate((errors: Array<FormValidationError> | undefined) => {
    if (!errors) {
      if (!loading.value) {
        loading.value = true;
        const loadingMessage = message.create("Weryfikowanie kodu", {
          type: "loading",
          duration: 0,
        });
        setTimeout(() => {
          loadingMessage.destroy();
          loading.value = false;
          emit("completed");
        }, 1000);
      }
    } else {
      message.error("Najpierw należy poprawnie uzupełnić formularz");
    }
  });
};
</script>

<template>
  <n-form ref="form" :model="model" :rules="rules">
    <n-form-item path="verificationCode" label="Kod dostępu">
      <n-input
        v-model:value="model.verificationCode"
        @keydown.enter.prevent="handleSubmit"
        minlength="8"
        maxlength="8"
        show-count
        placeholder="ANS21438"
        :on-blur="trimTrailingWhitespace"
        :input-props="{
          autocomplete: 'off',
        }"
      />
    </n-form-item>
    <div class="submit-wrapper">
      <n-button round type="primary" @click.prevent="handleSubmit">
        Zweryfikuj kod
      </n-button>
    </div>
  </n-form>
</template>

<style scoped lang="scss"></style>
