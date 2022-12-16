<script setup lang="ts">
import { NAvatar } from 'naive-ui';
</script>

<template>
    <div class="navbar-wrapper">
        <div class="school-name">
            <h1>Biblioteka ZSEM</h1>
        </div>
        <div class="user-wrapper">
            <div class="user-info">
                <h3>Patryk Gonet</h3>
                <p>Administrator</p>
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

    .user-wrapper {
        display: flex;
        gap: 1.5rem;

        .user-info {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .user-avatar {
            display: flex;
            align-items: center;
        }

        .user-settings {
            display: flex;
            align-items: center;

            i {
                font-size: 1.5rem;
            }
        }
    }
}
</style>