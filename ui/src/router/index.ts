import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView,
      children: [
        {
          path: "",
          name: "home",
          components: {
            SignUp: () => import("@/views/SignUpView.vue"),
            LogIn: () => import("@/views/LogInView.vue"),
          },
        },
        {
          path: "sign-up-school",
          name: "signUpSchool",
          components: {
            SignUp: () => import("@/views/SignUpSchoolView.vue"),
            LogIn: () => import("@/views/LogInView.vue"),
          },
        },
        {
          path: "sign-up",
          children: [
            {
              path: "",
              name: "signUpUser",
              components: {
                SignUp: () => import("@/views/SignUpUserView.vue"),
                LogIn: () => import("@/views/LogInView.vue"),
              },
            },
          ],
        },
      ],
      meta: {
        requiresAuth: false,
        requiredPermissionLevel: "user",
        transition: "curtains-transition",
      },
    },
    {
      path: "/dashboard-student",
      name: "dashboardStudent",
      component: () => import("@/views/StudentDashboardView.vue"),
      meta: {
        requiresAuth: false,
        requiredPermissionLevel: "student",
        transition: "curtains-transition",
      },
    },
    {
      path: "/dashboard-school",
      name: "dashboardSchool",
      component: () => import("@/views/SchoolDashboardView.vue"),
      meta: {
        requiresAuth: false,
        requiredPermissionLevel: "school",
        transition: "curtains-transition",
      },
    },
    {
      path: "/:catchAll(.*)",
      name: "notFound",
      component: () => import("@/views/PageNotFoundView.vue"),
    },
  ],
});

// router.beforeEach(async (to) => {
//   const authStore = useAuthStore();
//   await authStore.dispatch("loadAuthData");
//   if (authStore.getters.isLoggedIn) {
//     if (to.name === "login" || to.name === "sign-up") return "/";
//   }
//   if (to.meta.requiresAuth) {
//     if (!store.getters.isLoggedIn) {
//       return { name: "login" };
//     }
//     switch (to.meta.requiredPermissionLevel) {
//       case "admin": {
//         if (!store.getters.isAdmin) {
//           return {
//             name: "insufficientPermissions",
//           };
//         }
//         break;
//       }
//       case "owner": {
//         if (!store.getters.isOwner) {
//           return {
//             name: "insufficientPermissions",
//           };
//         }
//         break;
//       }
//       default: {
//         break;
//       }
//     }
//   }

//   return true;
// });

export default router;
