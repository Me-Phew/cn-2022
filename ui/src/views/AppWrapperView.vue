<script setup lang="ts">
import { watch } from "vue";
import { RouterView } from "vue-router";
import {
  useLoadingBar,
} from "naive-ui";
import { useUtilsStore } from '@/stores/utils';

const loadingBar = useLoadingBar();

const utilsStore = useUtilsStore();

utilsStore.$subscribe((_mutation, state) => {
  switch (state.navigationStatus) {
    case 'inProgress':
      loadingBar.start();
      break;
    case 'success':
      loadingBar.finish();
      break;
    case 'failed':
      loadingBar.error();
      break;
    default:
      loadingBar.error();
      break;
  }
})
</script>

<template>

  <RouterView v-slot="{ Component, route }">
    <transition :name="route.meta?.transition" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>

</template>

<style lang="scss">
.curtains-transition-enter-active,
.curtains-transition-leave-active {
  transition: all var(--transition-duration) linear;
  overflow: hidden;

  * {
    transition: all var(--transition-duration) linear;
  }
}

.curtains-transition-enter-from,
.curtains-transition-leave-to {
  opacity: 0;

  .sign-up-school {
    transform: translateY(-450px);
    opacity: 0;
  }

  .horizontal-divider,
  .sign-up {
    transform: translateX(-500px);
  }

  .sign-up-school,
  .sign-up-item:first-child {
    transform: translateY(-450px);
  }

  aside {
    .return {
      transform: translateY(450px);
    }
  }

  .sign-up-user,
  .sign-up-item:nth-child(3) {
    transform: translateY(450px);
  }

  .vertical-divider {
    transform: translateY(-1000px);
  }

  .sign-up-user {
    transform: translateY(450px);
    opacity: 0;
  }

  .log-in {
    transform: translateX(450px);
    opacity: 0;
  }
}

header {
  line-height: 1.5;
}

main.form-view {
  width: 100%;
  display: flex;
  flex-direction: column;
  place-items: center;
  place-content: center;
  position: relative;

  .button-wrapper {
    display: flex;
    justify-content: center;
  }
}

.sign-up-wrapper {
  display: flex;
  flex-direction: column;
  place-content: center;
  gap: 2rem;

  .sign-up {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    .n-date-picker {
      width: 100%;
    }

    .submit-wrapper {
      margin-top: 1rem;
      display: flex;
      justify-content: center;
    }
  }
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
