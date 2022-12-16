<script setup lang="ts">
import { ref } from "vue";
import {
  darkTheme,
  lightTheme,
  NConfigProvider,
  NMessageProvider,
  NLoadingBarProvider,
  NDialogProvider,
  NNotificationProvider,
} from "naive-ui";
import { usePreferredColorScheme } from "@vueuse/core";
import type { MessageProviderProps } from "naive-ui";
import AppWrapperView from '@/views/AppWrapperView.vue';

const preferredColorScheme = usePreferredColorScheme();
const messagePlacement = ref<MessageProviderProps["placement"]>("bottom");
</script>

<template>
  <n-config-provider :theme="preferredColorScheme === 'dark' ? darkTheme : lightTheme">
    <n-loading-bar-provider>
      <n-message-provider :placement="messagePlacement">
        <n-dialog-provider>
          <n-notification-provider>
            <AppWrapperView />
          </n-notification-provider>
        </n-dialog-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style lang="scss">

</style>
