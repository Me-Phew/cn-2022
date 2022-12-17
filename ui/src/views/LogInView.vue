<script setup lang="ts">
import TheLogin from "@/components/TheLogin.vue";
</script>

<template>
  <main class="form-view">
    <div class="vertical-divider"></div>
    <div class="log-in">
      <h1 class="text-accent">Logowanie</h1>
      <TheLogin />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.log-in {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}
</style>
