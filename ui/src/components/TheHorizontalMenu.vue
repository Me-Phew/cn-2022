<script setup lang="ts">
import type { MenuItem } from '@/views/SchoolDashboardView.vue';

const props = defineProps<{
    menuItems: Array<MenuItem>,
}>();
</script>

<template>
    <nav class="menu-wrapper">
        <ul>
            <li v-for="menuItem in props.menuItems" :key="menuItem.key">
                <router-link :to="{ name: menuItem.pathName }" class="menu-item">{{ menuItem.label }}</router-link>
            </li>
        </ul>
    </nav>
</template>



<style lang="scss">
.menu-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    ul {
        display: flex;

        li {
            list-style: none;
            padding: 0 20px;
            font-size: 20px;
        }
    }

    a {
        color: var(--color-heading);
    }

    a.router-link-exact-active,
    a.router-link-active {
        color: var(--color-accent);
    }
}
</style>