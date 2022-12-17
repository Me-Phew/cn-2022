import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useCookies } from "@vueuse/integrations/useCookies";
import axios, { AxiosError } from "axios";
import { handleRequestError } from "@/helpers";

export enum AccountType {
  school = "school",
  student = "student",
}

export const useAuthStore = defineStore("auth", () => {
  const accountType = ref<null | AccountType>(null);

  const isLoggedIn = computed((): Boolean => {
    const cookies = useCookies();
    return cookies.get("connect.sid") && accountType.value !== null;
  });

  const loadAccountType = async () => {
    try {
      const response = await axios.get("global/me");
      if (response.status === 200) {
        switch (response.data.accountType) {
          case "school": {
            accountType.value = AccountType.school;
            break;
          }
          case "student": {
            accountType.value = AccountType.student;
            break;
          }
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const response = handleRequestError(error);
        console.error(response);
      }
    }
  };

  return { accountType, isLoggedIn, loadAccountType };
});
