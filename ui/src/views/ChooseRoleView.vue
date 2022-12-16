<script setup lang="ts">
import SignUpItem from '@/components/SignUpItem.vue';
import studentOwl from '@/assets/student_owl.svg';
import teacherOwl from '@/assets/teacher_owl.svg';
</script>

<template>
  <aside>
    <SignUpItem routeName="signUpTeacher" :image="teacherOwl">
      Jestem nauczycielem
    </SignUpItem>
    <div class="horizontal-divider"></div>
    <SignUpItem routeName="signUpStudent" :image="studentOwl">
      Jestem uczniem
    </SignUpItem>
    <router-link class="return" :to="{ name: 'home' }">Powrót</router-link>
  </aside>
</template>

<style lang="scss" scoped>

</style>
