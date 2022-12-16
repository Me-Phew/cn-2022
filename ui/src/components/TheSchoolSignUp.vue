<script setup lang="ts">
import { ref } from "vue";
import type {
  FormInst,
  FormItemRule,
  FormValidationError,
  FormRules,
  FormItemInst,
  CascaderOption,
} from "naive-ui";
import {
  useMessage,
  NFormItem,
  NForm,
  NInput,
  NButton,
  NCheckbox,
  NCascader,
} from "naive-ui";
import { validateEmail } from "@/helpers";

export interface SchoolSignUp {
  name: string | null;
  email: string | null;
  regon: string | null;
  nip: string | null;
  rspo: string | null;
  schoolType: string | null;
  password: string | null;
  reenteredPassword: string | null;
  tosAccepted: boolean;
}

const emit = defineEmits(["completed"]);

const formRef = ref<FormInst | null>(null);
const rPasswordFormItemRef = ref<FormItemInst | null>(null);

const schoolSignUpModel = ref<SchoolSignUp>({ // todo: remove placeholders
  name: "Akademia Pana Kleksa",
  email: "company@example.com",
  regon: "000000000",
  nip: "0000000000",
  rspo: "000000",
  schoolType: "Szkoła podstawowa",
  password: "Kwakwa5!",
  reenteredPassword: "Kwakwa5!",
  tosAccepted: true,
});

const message = useMessage();

const handleSubmit = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors: Array<FormValidationError> | undefined) => {
    if (!errors) {
      emit('completed', schoolSignUpModel.value);
    } else {
      console.log(errors);
      message.error("Najpierw należy poprawnie uzupełnić formularz");
    }
  });
};

const handlePasswordInput = () => {
  if (schoolSignUpModel.value.reenteredPassword) {
    rPasswordFormItemRef.value?.validate({ trigger: "password-input" });
  }
};

const validatePasswordStartWith = (
  _rule: FormItemRule,
  value: string
): boolean => {
  return (
    !!schoolSignUpModel.value.password &&
    schoolSignUpModel.value.password.startsWith(value) &&
    schoolSignUpModel.value.password.length >= value.length
  );
};
const validatePasswordSame = (rule: FormItemRule, value: string): boolean => {
  return value === schoolSignUpModel.value.password;
};

const rules: FormRules = {
  name: [
    {
      required: true,
      validator(_rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("Nazwa placówki jest wymagana");
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
  regon: [
    {
      required: true,
      validator(_rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("Nr REGON jest wymagany");
        } else if (!(value.length === 9)) {
          return new Error("Podany nr REGON jest nieprawidłowy");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
  nip: [
    {
      required: false,
      validator(_rule: FormItemRule, value: string) {
        if (value && !(value.length === 10)) {
          return new Error("Podany nr NIP jest nieprawidłowy");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
  rspo: [
    {
      required: false,
      validator(_rule: FormItemRule, value: string) {
        if (value && (value.length < 4 || value.length > 8)) {
          return new Error("Podany nr RSPO jest nieprawidłowy");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
  schoolType: [
    {
      required: true,
      validator(_rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("Typ placówki1 jest wymagany");
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

const schoolTypesOptions: CascaderOption[] = [
  {
    value: "podstawowa",
    label: "Szkoła podstawowa",
  },
  {
    value: "srednia",
    label: "Szkoła średnia",
    children: [
      {
        value: "liceum",
        label: "Liceum",
      },
      {
        value: "technikum",
        label: "Technikum",
      },
      {
        value: "branzowa1",
        label: "Szkoła branżowa pierwszego stopnia",
      },
      {
        value: "branzowa2",
        label: "Szkoła branżowa drugiego stopnia",
      },
      {
        value: "specjalna",
        label: "Szkoła specjalna przysposabiająca do pracy",
      },
    ],
  },
  {
    value: "policealna",
    label: "Szkoła policealna",
  },
  {
    value: "uniwersytet",
    label: "Uniwersytet",
  },
];

const trimTrailingWhitespace = () => {
  schoolSignUpModel.value.name = schoolSignUpModel.value.name?.trim() ?? "";
};

const onlyAllowNumber = (value: string) => !value || /^\d+$/.test(value);
const noSpaces = (value: string) => !/ /g.test(value);
</script>

<template>
  <n-form ref="formRef" :model="schoolSignUpModel" :rules="rules">
    <n-form-item path="name" label="Nazwa">
      <n-input v-model:value="schoolSignUpModel.name" @keydown.enter.prevent maxlength="50"
        placeholder="Akademia Pana Kleksa" :on-blur="trimTrailingWhitespace" :input-props="{
          autocomplete: 'organization',
        }" />
    </n-form-item>
    <n-form-item path="email" label="Adres e-mail">
      <n-input v-model:value="schoolSignUpModel.email" @keydown.enter.prevent maxlength="320"
        placeholder="company@example.com" :allow-input="noSpaces" :input-props="{
          autocomplete: 'email',
        }" />
    </n-form-item>
    <n-form-item path="regon" label="REGON">
      <n-input v-model:value="schoolSignUpModel.regon" @keydown.enter.prevent minlength="9"
        maxlength="9" show-count :allow-input="onlyAllowNumber" placeholder="000000000"
        :input-props="{
          autocomplete: 'off',
        }" />
    </n-form-item>
    <n-form-item path="nip" label="NIP">
      <n-input v-model:value="schoolSignUpModel.nip" @keydown.enter.prevent minlength="10"
        maxlength="10" show-count :allow-input="onlyAllowNumber" placeholder="0000000000"
        :input-props="{
          autocomplete: 'off',
        }" />
    </n-form-item>
    <n-form-item path="rspo" label="RSPO">
      <n-input v-model:value="schoolSignUpModel.rspo" @keydown.enter.prevent minlength="4"
        maxlength="8" :allow-input="onlyAllowNumber" placeholder="000000" :input-props="{
          autocomplete: 'off',
        }" />
    </n-form-item>
    <n-form-item path="schoolType" label="Typ placówki">
      <n-cascader v-model:value="schoolSignUpModel.schoolType" :options="schoolTypesOptions"
        check-strategy="child" expand-trigger="hover" placeholder="Szkoła podstawowa" :input-props="{
          autocomplete: 'off',
        }" />
    </n-form-item>
    <n-form-item path="password" label="Hasło">
      <n-input v-model:value="schoolSignUpModel.password" type="password"
        @input="handlePasswordInput" @keydown.enter.prevent minlength="8" maxlength="128"
        placeholder="••••••••" :allow-input="noSpaces" :input-props="{
          autocomplete: 'new-password',
        }" />
    </n-form-item>
    <n-form-item ref="rPasswordFormItemRef" first path="reenteredPassword" label="Powtórz hasło"
      minlength="8" maxlength="128">
      <n-input v-model:value="schoolSignUpModel.reenteredPassword" type="password"
        @keydown.enter.prevent placeholder="••••••••" :allow-input="noSpaces" :input-props="{
          autocomplete: 'off',
        }" />
    </n-form-item>
    <n-form-item path="tosAccepted" class="tos">
      <n-checkbox v-model:checked="schoolSignUpModel.tosAccepted">
        Akceptuję regulamin serwisu i politykę prywatności
      </n-checkbox>
    </n-form-item>
    <div class="submit-wrapper">
      <n-button round type="primary" @click="handleSubmit">
        Dalej
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
