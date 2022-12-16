<script setup lang="ts">
import { useRouter } from 'vue-router';
import {
  NResult,
  NButton,
} from 'naive-ui';

const router = useRouter();

const goBack = () => {
  router.replace({ name: 'home' })
}
</script>

<template>
  <n-result status="404" title="404 Nie znaleziono strony"
    description="Kiedy człowiek skonfrontuje się z pustką, dokładnie widzi co ma w środku...">
    <template #footer>
      <n-button @click="goBack">Powrót na stronę główną</n-button>
    </template>
  </n-result>
</template>

<style scoped lang="scss">
.n-result {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
