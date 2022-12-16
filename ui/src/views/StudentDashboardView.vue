<script setup lang="ts">
import TheNavbar from '@/components/TheNavbar.vue';
import TheHorizontalMenu from '@/components/TheHorizontalMenu.vue';

import type { MenuItem } from '@/views/SchoolDashboardView.vue';

const menuItems: Array<MenuItem> = [
  {
    label: 'Wypożyczone ksiązki',
    pathName: 'borrowedBooks',
    key: 'borrowedBooks',
  },
  {
    label: 'Zarezerwowane ksiązki',
    pathName: 'bookedBooks',
    key: 'bookedBooks',
  },
  {
    label: 'Przeglądaj dostępne ksiązki',
    pathName: 'searchInBooks',
    key: 'searchInBooks',
  },
];
</script>

<template>
  <div class="student-dashboard-wrapper">
    <TheNavbar role="Uczeń" name="Patryk" lastName="Gonet"
      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
    <TheHorizontalMenu :menuItems="menuItems" />
  </div>
</template>

<style lang="scss" scoped>
.student-dashboard-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
