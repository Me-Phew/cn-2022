import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useUtilsStore } from "@/stores/utils";
import HomeView from "@/views/HomeView.vue";
import { NavigationStatus } from "@/stores/utils";

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
      children: [
        {
          path: '',
          name: 'borrowedBooks',
          components: {},
        },
        {
          path: 'booked-books',
          name: 'bookedBooks',
          components: {},
        },
        {
          path: 'search-in-books',
          name: 'searchInBooks',
          components: {},
        },
      ],
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
      children: [
        {
          path: "",
          name: 'books',
          components: {},
        },
        {
          path: 'lendings',
          name: 'lendings',
          components: {},
        },
        {
          path: "bookings",
          name: 'bookings',
          components: {},
        },
        {
          path: "users",
          name: "users",
          components: {},
        }
      ],
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

router.beforeEach(async (to) => {
  const utilsStore = useUtilsStore();
  utilsStore.$patch({
    navigationStatus: NavigationStatus.inProgress,
  });
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
});

router.afterEach((_to, _from, failure) => {
  const utilsStore = useUtilsStore();

  if (failure) {
    utilsStore.$patch({
      navigationStatus: NavigationStatus.failed,
    });
  } else {
    utilsStore.$patch({
      navigationStatus: NavigationStatus.success,
    });
  }
});

export default router;
