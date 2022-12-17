<script setup lang="ts">
import { ref } from "vue";
import axios, { AxiosError } from 'axios';
import type {
  FormRules,
  FormItemRule,
  FormInst,
  FormValidationError,
} from "naive-ui";
import { NForm, NFormItem, NInput, NButton, useMessage } from "naive-ui";
import { handleRequestError } from "@/helpers";

defineProps<{
  requiredCodeType: string;
}>();

const emit = defineEmits(["completed"]);

const form = ref<FormInst | null>(null);

interface ModelType {
  verificationCode: string | null;
}

const model = ref<ModelType>({
  verificationCode: "ANS2143asfg94hj8", // todo: delete placeholder
});

const rules: FormRules = {
  verificationCode: [
    {
      required: true,
      validator(_rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("Kod weryfikacyjny jest wymagany");
        } else if (!(value.length === 16)) {
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

const handleSubmit = async () => {
  form.value?.validate(async (errors: Array<FormValidationError> | undefined) => {
    if (!errors) {
      if (!loading.value) {
        loading.value = true;
        const loadingMessage = message.create("Weryfikowanie kodu", {
          type: "loading",
          duration: 0,
        });
        try {
          const response = await axios.get(`school/validate-code/${model.value.verificationCode}`);
          console.log(response);
          if (!response.data) {
            loadingMessage.destroy();
            loading.value = false;
            emit("completed");
          } else {
            loadingMessage.destroy();
            message.error("Podano nieprawidłowy lub wykorzystany kod");
          }

        } catch (error) {
          loadingMessage.destroy();
          if (error instanceof AxiosError) {
            const response = handleRequestError(error);
            if (response) {
              message.error(`Kod nie został zweryfikowany, status: ${response.status}, ${response.data?.message!}`);
            } else {
              message.error('Kod nie został zweryfikowany, status nie znany');
            }
          }
        }
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
      <n-input v-model:value="model.verificationCode" @keydown.enter.prevent="handleSubmit" minlength="16"
        maxlength="16" show-count placeholder="ANS21fh26j4d7438" :on-blur="trimTrailingWhitespace" :input-props="{
          autocomplete: 'off',
        }" />
    </n-form-item>
    <div class="submit-wrapper">
      <n-button round type="primary" @click.prevent="handleSubmit">
        Zweryfikuj kod
      </n-button>
    </div>
  </n-form>
</template>

<style scoped lang="scss">

</style>
