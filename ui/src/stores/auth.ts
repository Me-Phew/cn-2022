import { defineStore } from "pinia";
import router from '@/router';

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    // user: JSON.parse(localStorage.getItem("user")),
  }),
  // actions: {
  //   async login(username: String, password: String) {
  //     try {
  //       const user = await fetchWrapper.post(`${baseUrl}/authenticate`, {
  //         username,
  //         password,
  //       });

  //       // update pinia state
  //       this.user = user;

  //       // store user details and jwt in local storage to keep user logged in between page refreshes
  //       localStorage.setItem("user", JSON.stringify(user));

  //       // redirect to previous url or default to home page
  //       router.push(this.returnUrl || "/");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   },
  //   logout() {
  //     this.user = null;
  //     localStorage.removeItem("user");
  //     router.push("/account/login");
  //   },
  // },
});
