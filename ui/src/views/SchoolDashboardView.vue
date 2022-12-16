<script setup lang="ts">
import TheNavbar from '@/components/TheNavbar.vue';
import TheHorizontalMenu from '@/components/TheHorizontalMenu.vue';

export interface MenuItem extends Object {
    label: string,
    pathName: string,
    key: string,
}

const menuItems: Array<MenuItem> = [
    {
        label: 'Ksiązki',
        pathName: "books",
        key: 'books',
    },
    {

        label: 'Wypożyczenia',
        pathName: "lendings",
        key: 'lendings',
    },
    {
        label: 'Rezerwacje',
        pathName: "bookings",
        key: 'bookings',
    },
    {
        label: 'Użytkownicy',
        pathName: "users",
        key: 'users',
    },
];
</script>

<template>
    <div class="school-dashboard-wrapper">
        <TheNavbar />
        <TheHorizontalMenu :menuItems="menuItems" />
    </div>
</template>

<style lang="scss" scoped>

</style>