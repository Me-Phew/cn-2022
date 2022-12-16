<script setup lang="ts">
import { NCard, NList, NListItem, NTag } from 'naive-ui';
import type { SchoolSignUp } from "@/components/TheSchoolSignUp.vue";

defineProps<{
  schoolData: SchoolSignUp | null;
}>();

</script>


<template>
  <div>
    <NCard v-if="schoolData">
      <n-tag :bordered="false" type="info" size="large">
        {{ schoolData.name }}
      </n-tag>
      <NList>
        <NListItem>
          <p class="text-accent">Typ placówki</p>
          <p>{{ schoolData.schoolType }}</p>
        </NListItem>
        <NListItem>
          <p class="text-accent">Email</p>
          <p>{{ schoolData.email }}</p>
        </NListItem>
        <NListItem>
          <p class="text-accent">NIP</p>
          <p>{{ schoolData.nip }}</p>
        </NListItem>
        <NListItem>
          <p class="text-accent">REGON</p>
          <p>{{ schoolData.regon }}</p>
        </NListItem>
        <NListItem>
          <p class="text-accent">RSPO</p>
          <p>{{ schoolData.rspo }}</p>
        </NListItem>
      </NList>
    </NCard>
  </div>
</template>

<style lang="scss">
.n-card-header {
  // padding: 2rem 0 1rem 0 !important;
}
</style>
