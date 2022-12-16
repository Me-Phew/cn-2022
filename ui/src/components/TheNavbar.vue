<script setup lang="ts">
import { NAvatar } from 'naive-ui';
import { Icon } from '@vicons/utils';
import { School } from '@vicons/fa';

const props = defineProps<{
    role: string,
    name: string,
    secondName?: string | null,
    lastName: string,
}>()
</script>

<template>
    <div class="navbar-wrapper">
        <router-link :to="{ name: 'home' }" class="school-name">
            <Icon size="56" color="var(--color-accent)">
                <component :is="School"></component>
            </Icon>
            <h1>Biblioteka ZSEM</h1>
        </router-link>
        <div class="user-wrapper">
            <div class="user-info">
                <h3>{{ props.name }} <span v-if="props.secondName">{{ props.secondName }}</span> {{ props.lastName
                }}</h3>
                <p>{{ props.role }}</p>
            </div>
            <div class="user-avatar">
                <n-avatar round size="large" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
            </div>
            <div class="user-settings">
                <i class="ph-gear"></i>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.navbar-wrapper {
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;

    .school-name {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2em;

        h1 {
            color: var(--color-heading);
        }
    }

    a,
    a:visited,
    a:hover,
    a:active,
    a.router-link {
        text-decoration: none;
    }

    .user-wrapper {
        display: flex;
        gap: 1.5rem;

        .user-info {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;

            h3 {
                color: var(--color-heading);
            }

        }

        .user-avatar {
            display: flex;
            align-items: center;
        }

        .user-settings {
            display: flex;
            align-items: center;

            i {
                font-size: 2rem;
            }
        }
    }
}
</style>