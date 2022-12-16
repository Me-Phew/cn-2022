<script setup lang="ts">
import type { Component } from 'vue';
import { Icon } from '@vicons/utils';

defineProps<{
  routeName: string,
  icon?: Component,
  image?: string,
}>()
</script>

<template>
  <router-link :to="{ name: $props.routeName }" class="sign-up-item">
    <Icon size="96" color="var(--color-accent)" v-if="$props.icon">
      <component :is="$props.icon" />
    </Icon>

    <img :src="$props.image" v-if="$props.image" alt="Image" width="200" height="200">

    <slot />
  </router-link>
</template>

<style scoped lang="scss">
.sign-up-item {
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-size: 1.2rem;
  color: var(--color-text);
  position: relative;
  width: 80%;

  &:hover {
    background-color: var(--color-background-mute);
    border-radius: .375rem;
    color: var(--color-accent);
  }

  @media (min-width: 1024px) {
    width: 50%;
  }
}
</style>
