<script setup lang="ts">
import { NButton } from 'naive-ui';
</script>

<template>
    <div class="books-wrapper">
        <n-button type="primary" size="large">Dodaj książkę</n-button>
    </div>
</template>


<style lang="scss" scoped>
.books-wrapper {
    margin-top: 3rem;
    display: flex;
    justify-content: center;
}
</style>