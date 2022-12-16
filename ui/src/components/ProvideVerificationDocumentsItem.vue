<script setup lang="ts">
import { ref } from "vue";
import type {
  FormRules,
  FormItemRule,
  FormInst,
  FormValidationError,
  UploadFileInfo,
} from "naive-ui";
import { NForm, NFormItem, NUpload, NButton, useMessage } from "naive-ui";

const emit = defineEmits(["completed"]);

const form = ref<FormInst | null>(null);

interface ModelType {
  verificationCode: string | null;
}

const model = ref<ModelType>({
  verificationCode: null,
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
        }, 1500);
      }
    } else {
      message.error("Najpierw należy poprawnie uzupełnić formularz");
    }
  });
};

const fileList = ref<UploadFileInfo[]>([
  {
    id: "a",
    name: "我是上传出错的普通文件.png",
    status: "error",
  },
  {
    id: "b",
    name: "我是普通文本.doc",
    status: "finished",
    type: "text/plain",
  },
  {
    id: "c",
    name: "我是自带url的图片.png",
    status: "finished",
    url: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
  },
  {
    id: "d",
    name: "我是上传进度99%的文本.doc",
    status: "uploading",
    percentage: 99,
  },
]);
</script>

<template>
  <n-form ref="form" :model="model" :rules="rules">
    <n-form-item path="verificationCode">
      <n-upload action="" :default-file-list="fileList" list-type="image-card">
        Dowód osobisty
      </n-upload>
    </n-form-item>
    <div class="submit-wrapper">
      <n-button round type="primary" @click.prevent="handleSubmit">
        Zatwierdź dokumenty
      </n-button>
    </div>
  </n-form>
</template>

<style scoped lang="scss">

</style>
