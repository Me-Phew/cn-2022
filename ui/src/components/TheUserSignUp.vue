<script setup lang="ts">
import { ref } from "vue";
import type {
  FormInst,
  FormItemRule,
  FormValidationError,
  FormRules,
  FormItemInst,
} from "naive-ui";
import {
  useMessage,
  NFormItem,
  NForm,
  NInput,
  NButton,
  NRow,
  NCol,
  NSelect,
  NCheckbox,
  NDatePicker,
} from "naive-ui";
import { useNavigatorLanguage } from "@vueuse/core";
import {
  validateEmail,
  onlyAllowNumber,
  noSpaces,
  dateFormat,
  shortDateOptions,
} from "@/helpers";

const emit = defineEmits(["completed"]);

const { language } = useNavigatorLanguage();

const formRef = ref<FormInst | null>(null);
const rPasswordFormItemRef = ref<FormItemInst | null>(null);

interface ModelType {
  name: string | null;
  additionalName: string | null;
  surname: string | null;
  email: string | null;
  pesel: string | null;
  birthday: number | null;
  gender: string | null;
  password: string | null;
  reenteredPassword: string | null;
  tosAccepted: boolean;
}
const model = ref<ModelType>({
  name: "Jan",
  additionalName: "Janusz",
  surname: "Kowalski",
  email: "user@example.com",
  pesel: "00000000000",
  birthday: new Date().getTime(),
  gender: "male",
  password: "Kwakwa5!",
  reenteredPassword: "Kwakwa5!",
  tosAccepted: true,
});

const message = useMessage();

const handleSubmit = () => {
  formRef.value?.validate((errors: Array<FormValidationError> | undefined) => {
    if (!errors) {
      emit("completed");
    } else {
      message.error("Najpierw należy poprawnie uzupełnić formularz");
    }
  });
};

const handlePasswordInput = () => {
  if (model.value.reenteredPassword) {
    rPasswordFormItemRef.value?.validate({ trigger: "password-input" });
  }
};

const validatePasswordStartWith = (
  rule: FormItemRule,
  value: string
): boolean => {
  return (
    !!model.value.password &&
    model.value.password.startsWith(value) &&
    model.value.password.length >= value.length
  );
};
const validatePasswordSame = (rule: FormItemRule, value: string): boolean => {
  return value === model.value.password;
};

const rules: FormRules = {
  name: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("Imię jest wymagane");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
  additionalName: [
    {
      required: false,
    },
  ],
  surname: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("Nazwisko jest wymagane");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
  email: [
    {
      required: true,
      validator(_rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("Adres email jest wymagany");
        } else if (!validateEmail(value)) {
          return new Error("Podany adres email jest nieprawidłowy");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
  pesel: [
    {
      required: true,
      validator(_rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("Nr Pesel jest wymagany");
        } else if (!(value.length === 11)) {
          return new Error("Podany nr Pesel jest nieprawidłowy");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
  birthday: [
    {
      required: true,
      validator(_rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("Data urodzenia jest wymagana");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
  gender: [
    {
      required: true,
      validator(_rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("Płeć jest wymagana");
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
          return new Error("Hasło jest wymagane");
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
  reenteredPassword: [
    {
      required: true,
      message: "Powtórz hasło",
      trigger: ["input", "blur"],
    },
    {
      validator: validatePasswordStartWith,
      message: "Podane hasła nie są takie same!",
      trigger: "input",
    },
    {
      validator: validatePasswordSame,
      message: "Podane hasła nie są takie same!",
      trigger: ["blur", "password-input"],
    },
  ],
  tosAccepted: [
    {
      required: true,
      validator(_rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("Zaakceptuj regulamin");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
};

const genderOptions = ["żeńska", "męska", "inna"].map((v) => ({
  label: v,
  value: v,
}));
</script>

<template>
  <n-form ref="formRef" :model="model" :rules="rules">
    <n-row :gutter="[0, 24]" justify-content="space-between">
      <n-col :span="10">
        <n-form-item path="name" label="Imię">
          <n-input v-model:value="model.name" @keydown.enter.prevent maxlength="50"
            placeholder="Jan" :allow-input="noSpaces" :input-props="{
              autocomplete: 'given-name',
            }" />
        </n-form-item>
      </n-col>
      <n-col :span="10">
        <n-form-item path="additionalName" label="Drugie imię">
          <n-input v-model:value="model.additionalName" @keydown.enter.prevent maxlength="50"
            placeholder="Janusz" :allow-input="noSpaces" :input-props="{
              autocomplete: 'additional-name',
            }" />
        </n-form-item>
      </n-col>
    </n-row>
    <n-form-item path="surname" label="Nazwisko">
      <n-input v-model:value="model.surname" @keydown.enter.prevent maxlength="80"
        placeholder="Kowalski" :allow-input="noSpaces" :input-props="{
          autocomplete: 'family-name',
        }" />
    </n-form-item>
    <n-form-item path="email" label="Adres e-mail">
      <n-input v-model:value="model.email" @keydown.enter.prevent maxlength="320"
        placeholder="user@example.com" :allow-input="noSpaces" />
    </n-form-item>
    <n-form-item path="pesel" label="Nr Pesel">
      <n-input v-model:value="model.pesel" @keydown.enter.prevent minlength="11" maxlength="11"
        show-count :allow-input="onlyAllowNumber" placeholder="00000000000" :input-props="{
          autocomplete: 'email',
        }" />
    </n-form-item>
    <n-form-item path="birthday" label="Data urodzenia">
      <n-date-picker v-model:value="model.birthday" type="date" :format="dateFormat"
        :placeholder="new Date().toLocaleString(language, shortDateOptions)" :input-props="{
          autocomplete: 'off',
        }" />
    </n-form-item>
    <n-form-item path="gender" label="Płeć">
      <n-select v-model:value="model.gender" :options="genderOptions"
        placeholder="Apache Attack Helicopter" :input-props="{
          autocomplete: 'off',
        }" />
    </n-form-item>
    <n-form-item path="password" label="Hasło">
      <n-input v-model:value="model.password" type="password" @input="handlePasswordInput"
        @keydown.enter.prevent minlength="8" maxlength="128" placeholder="••••••••"
        :allow-input="noSpaces" :input-props="{
          autocomplete: 'new-password',
        }" />
    </n-form-item>
    <n-form-item ref="rPasswordFormItemRef" first path="reenteredPassword" label="Powtórz hasło">
      <n-input v-model:value="model.reenteredPassword" type="password" @keydown.enter.prevent
        placeholder="••••••••" :allow-input="noSpaces" minlength="8" maxlength="128" :input-props="{
          autocomplete: 'off',
        }" />
    </n-form-item>
    <n-form-item path="tosAccepted" class="tos">
      <n-checkbox v-model:checked="model.tosAccepted">
        Akceptuję regulamin serwisu i politykę prywatności
      </n-checkbox>
    </n-form-item>
    <div class="submit-wrapper">
      <n-button round type="primary" @click.prevent="handleSubmit">
        Potwierdź dane
      </n-button>
    </div>
  </n-form>
</template>

<style scoped lang="scss">
.n-form-item.tos {
  grid-template-areas:
    "blank"
    "feedback";
}
</style>
