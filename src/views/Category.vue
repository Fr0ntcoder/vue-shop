<template>
    <div class="category-content">
        <div class="category-wrap">
            <div class="category-sort">
                <span class="category-sort__title">Сортировать:</span>
                <div class="category-sort__content">
                    <a href="#" class="category-sort__link" @click.prevent="sortUp">По возрастанию <i class="material-icons rotate">sort</i></a>
                    <a href="#" class="category-sort__link" @click.prevent="sortDown">По убыванию <i class="material-icons">sort</i></a>
                    <a href="#" class="category-sort__link" @click.prevent="sortRating">По рейтингу</a>
                </div>
            </div>
            <transition-group name="list" tag="ul" class="category-list" apper>
                <li class="category-item" v-for="item of filterCategory" :key="item.id">
                    <div class="category-item__wrap">
                        <span :class="`category-item__img category-item__img--${item.category}`">
                            <img :src="item.img" alt="">
                        </span>
                        <div class="category-item__content">
                            <router-link class="category-item__title" tag="a" :to="{name: 'product-single',params: {category: item.category, id: item.id},query: {id: item.id}}">{{item.title}}</router-link>
                            <div class="category-item__stat">
                                <ul class="category-item__rating-list">
                                    <li class="category-item__rating-item" v-for="(n,i) of 5" :key="i">
                                        <i class="material-icons" v-if="n <= item.rating">star</i>
                                        <i class="material-icons" v-else>star_border</i>
                                    </li>
                                </ul>
                                <span class="category-item__reviews" v-if="item.reviews != '[]'">{{Object.values(item.reviews).length | filterText}}</span>
                                <span class="category-item__reviews" v-else>Нет отзывов</span>
                            </div>
                            <span class="category-item__price">{{item.price | filterCurrency}}</span>
                            <button class="category-item__add" @click.prevent="addProductCart(item)" v-if="!item.active">
                                <span class="category-item__add-text">Добавить в корзину <font-awesome-icon icon="shopping-cart"/></span>               
                            </button>
                            <router-link to="/cart" tag="a" class="category-item__add category-item__add--modif" v-else>
                                <span class="category-item__add-text">Перейти в корзину <font-awesome-icon icon="shopping-cart"/></span>               
                            </router-link>
                        </div>
                    </div>
                </li>
            </transition-group>
        </div>
    </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"
import Loader from "@/components/Loader" 
export default {
    metaInfo() {
        return {
            title: `vue-shop | ${this.$route.params.name}`

        }
    },
    name: "category",
    data: () => ({
        loader: false,

    }),
    components: {
        Loader
    },
    computed: {
        ...mapGetters(["PRODUCTS","CART","PRODUCTS_CAT","PRODUCTS_CATEGORY","BRAND","PRODUCTS_FILTER","PRODUCTS_CATEGORY_TEXT"]),
        filterCategory() {
            if(!this.BRAND.length) {
                return this.PRODUCTS_FILTER.map(el => {
                    const cartID = this.CART.map(elem => elem.id);
                    if(cartID.includes(el.id)) {
                        return {
                            ...el,
                            active: true
                        }
                    }else {
                        return el;
                    }
                })
            }else {
                return this.PRODUCTS_CATEGORY(this.BRAND).map(el => {
                    const cartID = this.CART.map(elem => elem.id);
                    if(cartID.includes(el.id)) {
                        return {
                            ...el,
                            active: true
                        }
                    }else {
                        return el;
                    }
                })
            }
        },
    },
    methods: {
        ...mapActions(["GET_PRODUCTS","ADD_FILTER_PRODUCTS","ADD_CART","ADD_FILTER_BRAND","ADD_BRAND"]),
        addProductCart(arr) {  
            const {id,title,img,counter,price,category} = arr;          
            this.ADD_CART({id,title,img,counter: counter + 1,price,category})
        },
        sortUp() {
            this.PRODUCTS_FILTER.sort((a,b) => {
                return a.price - b.price
            })
        },
        sortDown() {
            this.PRODUCTS_FILTER.sort((a,b) => {
                return b.price - a.price
            })
        },
        sortRating() {
            this.PRODUCTS_FILTER.sort((a,b) => {
                return b.rating - a.rating;
            })
        },
        fetchData() {
            this.ADD_FILTER_PRODUCTS(this.PRODUCTS_CAT(this.$route.params.category))
            this.ADD_FILTER_BRAND(this.PRODUCTS_CAT(this.$route.params.category))
        }
    },
    watch: {
        $route: 'fetchData'

    },
    created() {
        this.fetchData()
    },
    async mounted() {
        await this.GET_PRODUCTS()
        this.loader = false
    },
    
}
</script>

<style lang="scss">
    .category {
        &-sort {
            display: flex;
            font-size: 16px;
            align-items: center;
            margin-bottom: 30px;
            &__title {
                margin-right: 15px;
            }
            &__link {
                display: flex;
                font-size: 16px;
                align-items: center;
                margin-right: 15px;
                color: #000;
                &:last-child {
                    margin-right: 0;
                }
                & i {
                    margin-left: 10px;
                }
            }
            &__content {
                display: flex;
                align-items: center;
                & .rotate {
                    transform: rotate(180deg);
                }
            }
        }
        &-content {
            &__empty {
                display: flex;
                font-size: 22px;
                font-weight: 700;
                justify-content: center;
                padding: 50px;
            }
        }
        &-list {
            display: flex;
            flex-wrap: wrap;
        }
        &-item {
            width: 33.33%;
            margin-bottom: 30px;
            &__add {
                display: flex;
                width: 100%;
                font-size: 16px;
                font-weight: 700;
                padding: 15px;
                border: none;
                border-radius: 5px;
                justify-content: center;
                align-items: center;
                background: var(--bg-color);
                color: #fff;
                cursor: pointer;
                &--modif {
                    background: red;
                }
            }
            &__price {
                display: block;
                font-size: 22px;
                font-weight: 900;
                margin-bottom: 30px;
            }
            &__reviews {
                font-size: 14px;
            }
            &__stat {
                display: flex;
                align-items: center;
                margin: 15px 0;
            }
            &__rating {
                &-list {
                    display: flex;
                    margin-right: 15px;
                }
                &-item {
                    font-size: 14px;
                }
            }
            &__wrap {
                display: flex;
                height: 100%;
                flex-direction: column;
                justify-content: space-between;
                padding: 0 15px;
            }
            &__img {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                margin: 0 auto 15px;
                &--phone {
                    max-width: 120px;
                    width: 100%;
                }
                &--washer {
                    max-width: 150px;
                    width: 100%;
                }
                &--fridge {
                    max-width: 120px;
                    width: 100%;
                }
                &--headphones {
                    max-width: 150px;
                    width: 100%;
                }
            }
            &__title {
                display: block;
                font-size: 16px;
                font-weight: 900;
                min-height: 50px;
                color: #333;
            }
        }
    }
    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }
    .list-enter, .list-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }
</style>