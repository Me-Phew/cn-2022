<script setup lang="ts">
import SignUpItem from '@/components/SignUpItem.vue';
import { School } from '@vicons/fa';
import { SchoolFilled } from '@vicons/material';
</script>

<template>
  <SignUpItem routeName="signUpSchool" :icon="School" class="sign-up-school">
    Zarejestruj szkołę
  </SignUpItem>
  <div class="horizontal-divider"></div>
  <SignUpItem routeName="signUpUser" :icon="SchoolFilled" class="sign-up-user">
    Utwórz konto ucznia / nauczyciela
  </SignUpItem>
</template>

<style lang="scss">

</style>
