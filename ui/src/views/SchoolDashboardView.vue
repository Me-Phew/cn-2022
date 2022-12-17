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
        label: 'Uczniowie',
        pathName: "users",
        key: 'users',
    },
];
</script>

<template>
    <div class="school-dashboard-wrapper">
        <TheNavbar school="ZSEM" role="Administrator" name="Walenty" lastName="Szarek"
            src="https://previews.123rf.com/images/findriyani/findriyani1807/findriyani180700241/105630149-education-people-school-logo-design-template.jpg" />
        <TheHorizontalMenu :menuItems="menuItems" />
        <RouterView name="schoolDashboard" />
    </div>
</template>

<style lang="scss" scoped>
.school-dashboard-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}
</style>