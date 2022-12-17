<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { NButton, NCard, NTag } from 'naive-ui';
import axios, { AxiosError } from 'axios';
import { handleRequestError } from '@/helpers';
import astronaut from '@/assets/astronaut.jpg';
import paleBlueDot from '@/assets/pale_blue_dot.png';
import spacex from '@/assets/spacex-wallpaper.jpg';

export interface CardInterface extends Object {
    title: string,
    imgSrc: string | null,
    author: string,
    category: object,
    quantity: number,
    amount: number,
}

export interface CardInterfaceComputed extends CardInterface {
    availability: string,
}

const images = [
    paleBlueDot,
    astronaut,
    spacex,
]

const cardsData = ref<Array<CardInterface>>([]);

const loadBooks = async () => {
    try {
        const response = await axios.get('book');
        if (response.status === 200) {
            cardsData.value = response.data.books;
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            handleRequestError(error);
        }
    }
}

onMounted(async () => {
    await loadBooks();
})

const cardsDataComputed = computed(() => {
    const newCardsData: Array<CardInterfaceComputed> = [];

    cardsData.value.forEach(cardData => {
        let availability;
        if (cardData.quantity / cardData.amount > (.25 * cardData.amount)) {
            availability = 'low ';
        }
        if (cardData.amount === 0) {
            availability = 'none';
        }
        if (!availability) {
            availability = 'good';
        }

        newCardsData.push({ ...cardData, availability: availability, });
    });
    return newCardsData;
})
</script>

<template>
    <div class="books-page-wrapper">
        <router-link :to="{ name: 'addBook' }">
            <n-button type="primary" size="large">
                Dodaj książkę
            </n-button>
        </router-link>
        <div class="books-wrapper">
            <div class="card" v-for="(card, index) in cardsDataComputed" :key="card.title">
                <n-card :title="card.title" class="n-card">
                    <template #cover>
                        <img :src="images[index]" v-if="index < 3">
                        <i class="ph-image" v-else></i>
                        <n-tag type="info" size="small">
                            <h3>{{ card.category.name }}</h3>
                        </n-tag>
                    </template>
                    <div class="tags">
                        <h3>Autor: {{ card.author.firstName }} {{ card.author.secondName }} {{
                                card.author.lastName
                        }}</h3>
                        <n-tag :bordered="false">
                            <p>
                                Dostępne:
                                <span :class="card.availability">
                                    {{ card.amount }}/{{ card.quantity }}
                                </span>
                            </p>
                        </n-tag>
                    </div>
                </n-card>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.books-page-wrapper {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    .books-wrapper {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;

        .card {
            max-width: 280px;

            i {
                font-size: 280px;
            }

            .tags {
                display: grid;
                flex-direction: column;
                gap: .6rem;
            }

            .good {
                color: var(--color-accent);
            }

            .low {
                color: orange;
            }

            .none {
                color: red;
            }
        }
    }
}
</style>
