import { defineStore } from "pinia";
import { ref, computed } from "vue";

export enum NavigationStatus {
  inProgress = "inProgress",
  success = "success",
  failed = "failed",
}

export const useUtilsStore = defineStore("counter", () => {
  const navigationStatus = ref<null | NavigationStatus>(null);

  const setNavigationStatus = (newStatus: NavigationStatus) => {
    navigationStatus.value = newStatus;
  };

  return { navigationStatus, setNavigationStatus };
});
