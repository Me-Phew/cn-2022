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
    return cookies.get("connect.sid");
  });

  const loadAccountType = async () => {
    try {
      const response = await axios.get("me");
      if (response.status === 200) {
        accountType.value = response.data.accountType;
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
