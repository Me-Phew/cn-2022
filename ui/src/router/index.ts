import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore, AccountType } from "@/stores/auth";
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
        allowedAfterLogIn: false,
        transition: "curtains-transition",
      },
    },
    {
      path: "/dashboard-student",
      name: "dashboardStudent",
      component: () => import("@/views/StudentDashboardView.vue"),
      children: [
        {
          path: "",
          name: "borrowedBooks",
          components: {},
        },
        {
          path: "booked-books",
          name: "bookedBooks",
          components: {},
        },
        {
          path: "search-in-books",
          name: "searchInBooks",
          components: {},
        },
      ],
      meta: {
        requiresAuth: true,
        requiredAccountType: AccountType.student,
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
          name: "books",
          components: {
            schoolDashboard: () => import('@/views/BooksView.vue'),
          },
        },
        {
          path: "lendings",
          name: "lendings",
          components: {},
        },
        {
          path: "bookings",
          name: "bookings",
          components: {},
        },
        {
          path: "users",
          name: "users",
          components: {},
        },
      ],
      meta: {
        requiresAuth: true,
        requiredAccountType: AccountType.school,
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
  const authStore = useAuthStore();

  if (to.meta.requiresAuth) {
    if (authStore.isLoggedIn) {
      authStore.loadAccountType();
      if (authStore.accountType !== to.meta.requiredAccountType) {
        switch (authStore.accountType) {
          case AccountType.student: {
            return { path: "/dashboard-student" };
          }
          case AccountType.school: {
            return { path: "/dashboard-school" };
          }
        }
      }
    } else {
      return { name: "home" };
    }
  } else {
    if (!to.meta.allowedAfterLogIn) {
      authStore.loadAccountType();
      switch (authStore.accountType) {
        case AccountType.student: {
          return { path: "/dashboard-student" };
        }
        case AccountType.school: {
          return { path: "/dashboard-school" };
        }
      }
    }
  }

  return true;
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
