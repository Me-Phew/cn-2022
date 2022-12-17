<script setup lang="ts">
import { ref, computed } from 'vue';
import { NButton, NCard, NTag } from 'naive-ui';

export interface CardInterface extends Object {
    title: string,
    imgSrc: string,
    author: string,
    category: string,
    quantity: number,
    available: number,
}

export interface CardInterfaceComputed extends CardInterface {
    availability: string,
}

const cardsData = ref<Array<CardInterface>>([
    {
        title: 'W pustyni i w puszczy',
        imgSrc: 'https://www.greg.pl/imgs/covers/500/W-pustyni-i-w-puszczy_lpp.jpg',
        author: 'Henryk Sienkiewicz',
        category: 'Pierdolony MeloDramat',
        quantity: 20,
        available: 4,
    },
    {
        title: 'W pustyni i w puszczy',
        imgSrc: 'https://www.greg.pl/imgs/covers/500/W-pustyni-i-w-puszczy_lpp.jpg',
        author: 'Henryk Sienkiewicz',
        category: 'Pierdolony MeloDramat',
        quantity: 20,
        available: 4,
    },
    {
        title: 'W pustyni i w puszczy',
        imgSrc: 'https://www.greg.pl/imgs/covers/500/W-pustyni-i-w-puszczy_lpp.jpg',
        author: 'Henryk Sienkiewicz',
        category: 'Pierdolony MeloDramat',

        quantity: 20,
        available: 0,
    },
    {
        title: 'W pustyni i w puszczy',
        imgSrc: 'https://www.greg.pl/imgs/covers/500/W-pustyni-i-w-puszczy_lpp.jpg',
        author: 'Henryk Sienkiewicz',
        category: 'Pierdolony MeloDramat',

        quantity: 20,
        available: 18,
    },
    {
        title: 'W pustyni i w puszczy',
        imgSrc: 'https://www.greg.pl/imgs/covers/500/W-pustyni-i-w-puszczy_lpp.jpg',
        author: 'Henryk Sienkiewicz',
        category: 'Pierdolony MeloDramat',

        quantity: 20,
        available: 4,
    },
    {
        title: 'W pustyni i w puszczy',
        imgSrc: 'https://www.greg.pl/imgs/covers/500/W-pustyni-i-w-puszczy_lpp.jpg',
        author: 'Henryk Sienkiewicz',
        category: 'Pierdolony MeloDramat',

        quantity: 20,
        available: 4,
    },
    {
        title: 'W pustyni i w puszczy',
        imgSrc: 'https://www.greg.pl/imgs/covers/500/W-pustyni-i-w-puszczy_lpp.jpg',
        author: 'Henryk Sienkiewicz',
        category: 'Pierdolony MeloDramat',

        quantity: 20,
        available: 4,
    },
    {
        title: 'W pustyni i w puszczy',
        imgSrc: 'https://www.greg.pl/imgs/covers/500/W-pustyni-i-w-puszczy_lpp.jpg',
        author: 'Henryk Sienkiewicz',
        category: 'Pierdolony MeloDramat',

        quantity: 20,
        available: 4,
    },
    {
        title: 'W pustyni i w puszczy',
        imgSrc: 'https://www.greg.pl/imgs/covers/500/W-pustyni-i-w-puszczy_lpp.jpg',
        author: 'Henryk Sienkiewicz',
        category: 'Pierdolony MeloDramat',

        quantity: 20,
        available: 4,
    },
    {
        title: 'W pustyni i w puszczy',
        imgSrc: 'https://www.greg.pl/imgs/covers/500/W-pustyni-i-w-puszczy_lpp.jpg',
        author: 'Henryk Sienkiewicz',
        category: 'Pierdolony MeloDramat',

        quantity: 20,
        available: 4,
    },
    {
        title: 'W pustyni i w puszczy',
        imgSrc: 'https://www.greg.pl/imgs/covers/500/W-pustyni-i-w-puszczy_lpp.jpg',
        author: 'Henryk Sienkiewicz',
        category: 'Pierdolony MeloDramat',

        quantity: 20,
        available: 4,
    },
    {
        title: 'W pustyni i w puszczy',
        imgSrc: 'https://www.greg.pl/imgs/covers/500/W-pustyni-i-w-puszczy_lpp.jpg',
        author: 'Henryk Sienkiewicz',
        category: 'Pierdolony MeloDramat',

        quantity: 20,
        available: 4,
    },
    {
        title: 'W pustyni i w puszczy',
        imgSrc: 'https://www.greg.pl/imgs/covers/500/W-pustyni-i-w-puszczy_lpp.jpg',
        author: 'Henryk Sienkiewicz',
        category: 'Pierdolony MeloDramat',

        quantity: 20,
        available: 4,
    },
    {
        title: 'W pustyni i w puszczy',
        imgSrc: 'https://www.greg.pl/imgs/covers/500/W-pustyni-i-w-puszczy_lpp.jpg',
        author: 'Henryk Sienkiewicz',
        category: 'Pierdolony MeloDramat',

        quantity: 20,
        available: 4,
    },
    {
        title: 'W pustyni i w puszczy',
        imgSrc: 'https://www.greg.pl/imgs/covers/500/W-pustyni-i-w-puszczy_lpp.jpg',
        author: 'Henryk Sienkiewicz',
        category: 'Pierdolony MeloDramat',

        quantity: 20,
        available: 4,
    },
    {
        title: 'W pustyni i w puszczy',
        imgSrc: 'https://www.greg.pl/imgs/covers/500/W-pustyni-i-w-puszczy_lpp.jpg',
        author: 'Henryk Sienkiewicz',
        category: 'Pierdolony MeloDramat',

        quantity: 20,
        available: 4,
    },
    {
        title: 'W pustyni i w puszczy',
        imgSrc: 'https://www.greg.pl/imgs/covers/500/W-pustyni-i-w-puszczy_lpp.jpg',
        author: 'Henryk Sienkiewicz',
        category: 'Pierdolony MeloDramat',

        quantity: 20,
        available: 4,
    },
]);

const cardsDataComputed = computed(() => {
    const newCardsData: Array<CardInterfaceComputed> = [];

    cardsData.value.forEach(cardData => {
        let availability;
        if (cardData.quantity / cardData.available > (.25 * cardData.available)) {
            availability = 'low ';
        }
        if (cardData.available === 0) {
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
            <div class="card" v-for="card in cardsDataComputed" :key="card.title">
                <n-card :title="card.title" class="n-card">
                    <template #cover>
                        <img :src="card.imgSrc">
                    </template>
                    <div class="tags">
                        <n-tag type="info" size="small">
                            <h3>{{ card.category }}</h3>
                        </n-tag>
                        <n-tag>
                            <h3>Autor: {{ card.author }}</h3>
                        </n-tag>
                        <n-tag :bordered="false">
                            <p>
                                Dostępne:
                                <span :class="card.availability">
                                    {{ card.available }}/{{ card.quantity }}
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

            .tags {
                display: grid;
                flex-direction: column;
                gap: .2rem;
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