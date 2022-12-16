<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="home page">
    <header class="sign-up-wrapper">
      <RouterView name="SignUp" v-slot="{ Component }">
        <transition name="sign-up-transition" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </header>

    <RouterView name="LogIn" v-slot="{ Component }">
      <transition name="log-in-transition" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>

<style lang="scss">
.log-in-transition-enter-active,
.log-in-transition-leave-active,
.sign-up-transition-enter-active,
.sign-up-transition-leave-active {
  transition: all var(--transition-duration) linear;

  overflow: hidden;

  * {
    transition: all var(--transition-duration) linear !important;
  }
}

.sign-up-transition-enter-from,
.sign-up-transition-leave-to {
  opacity: 0;

  &.sign-up {
    h1 {
      transform: translateY(-450px);
    }

    .n-form-item-label,
    .n-checkbox,
    .submit-wrapper,
    .return {
      transform: translateX(-450px);
    }

    .n-input,
    .n-select {
      transform: translateX(450px);
    }
  }

  .horizontal-divider {
    transform: translateX(-450px);
  }

  .sign-up-school,
  .sign-up-item:first-child {
    transform: translateY(-450px);
  }

  .sign-up-user,
  .sign-up-item:nth-child(3),
  .return {
    transform: translateY(450px);
  }
}

.log-in-transition-enter-from,
.log-in-transition-leave-to {
  transform: translateX(90px);
  opacity: 0;
}

.home {
  height: 100%;
  width: 100%;
  overflow-x: hidden;

  .horizontal-divider {
    width: 60%;
    height: 2px;
    background-color: var(--color-background-mute);
    border-radius: 0.345rem;
  }

  aside {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    height: 100%;
    width: 100%;
    align-items: center;
  }

  @media (min-width: 1024px) {
    & {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .horizontal-divider {
      width: 40%;
      height: 2px;
      background-color: var(--color-background-mute);
      border-radius: 0.345rem;
    }
  }

  aside {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
}
</style>
