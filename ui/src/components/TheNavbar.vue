<script setup lang="ts">
import { NAvatar, NButton, useMessage } from 'naive-ui';
import { Icon } from '@vicons/utils';
import { School } from '@vicons/fa';
import axios, { AxiosError } from 'axios';
import { handleRequestError } from '@/helpers';
import router from '@/router';


const props = defineProps<{
    school: string,
    role: string,
    name: string,
    secondName?: string | null,
    lastName: string,
    src: string,
}>()

const message = useMessage();

const signOut = async () => {
    try {
        await axios.post('school/logout');
        router.push({ name: 'home' });
        message.success("Wylogowano pomyślnie");
    } catch (error) {
        if (error instanceof AxiosError) {
            const response = handleRequestError(error);
            if (response) {
                message.error(`Wystąpił błąd podczas wylogowywania, status: ${response.status}, ${response.data?.message!}`);
            } else {
                message.error('Wystąpił błąd podczas wylogowywyania, status nieznany');
            }
        }
    }
};
</script>

<template>
    <div class="navbar-wrapper">
        <router-link :to="{ name: 'home' }" class="school-name">
            <Icon size="56" color="var(--color-accent)">
                <component :is="School"></component>
            </Icon>
            <h1>Biblioteka: {{ props.school }}</h1>
        </router-link>
        <div class="user-wrapper">
            <div class="user-info">
                <h3>{{ props.name }} <span v-if="props.secondName">{{ props.secondName }}</span> {{ props.lastName
                }}</h3>
                <p>{{ props.role }}</p>
            </div>
            <div class="user-avatar">
                <n-avatar round size="large" :src="props.src" />
            </div>
            <n-button circle class="user-sign-out" size="large" :bordered="false" :focusable="false" @click="signOut">
                <template #icon>
                    <i class="ph-sign-out"></i>
                </template>
            </n-button>
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

        .user-sign-out {
            margin: auto;

            &:hover {
                cursor: pointer;
            }

            i {
                font-size: 2rem;
            }
        }
    }
}
</style>