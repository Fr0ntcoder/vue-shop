<template>
    <div class="stat-block">
        <ul class="stat-rating__list" v-if="reviews != '[]'">
            <li class="stat-rating__item" v-for="(n,i) of 5" :key="i">
                <i class="material-icons" v-if="n <= averageRating(reviews)">star</i>
                <i class="material-icons" v-else>star_border</i>
            </li>
        </ul>
        <ul class="stat-rating__list" v-else>
            <li class="stat-rating__item" v-for="(n,i) of 5" :key="i">
                <i class="material-icons">star_border</i>
            </li>
        </ul>
        <span class="stat-rating__reviews" v-if="reviews != '[]'">{{Object.values(reviews).length | filterText}}</span>
        <span class="stat-rating__reviews" v-else>Нет отзывов</span>
    </div>
</template>

<script>
export default {
    props: ["reviews"],
    name: "stat-info",
    methods: {
        averageRating(arr) {
            const sum = Object.values(arr).reduce((total,el) => {
                return total + el.rating;
            },0)
            return Math.ceil(sum/Object.values(arr).length);
        },
    }
}
</script>

<style lang="scss">
    .stat {
        &-block {
            display: flex;
            align-items: center;
            margin: 15px 0;
        }
        &-rating {
            &__list {
                display: flex;
                margin-right: 15px;
            }
            &__item {
                font-size: 16px;
            }
            &__reviews {
                font-size: 16px;
            }
        }
    }
</style>