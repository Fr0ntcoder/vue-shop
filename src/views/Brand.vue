<template>
  <div class="category-content">
        <div class="category-wrap">
            <div class="category-sort">
                <span class="category-sort__title">Сортировать:</span>
                <div class="category-sort__content">
                    <a href="#" class="category-sort__link" @click.prevent="sortUp">По возрастанию <i class="material-icons rotate">sort</i></a>
                    <a href="#" class="category-sort__link" @click.prevent="sortDown">По убыванию <i class="material-icons">sort</i></a>
                </div>
            </div>
            <transition-group name="list" tag="ul" class="category-list" apper>
                <li class="category-item" v-for="item of productsFIlter" :key="item.id">
                    <div class="category-item__wrap">
                        <span :class="`category-item__img category-item__img--${item.category}`">
                            <img :src="item.img" alt="">
                        </span>
                        <div class="category-item__content">
                            <router-link class="category-item__title" tag="a" :to="{name: 'product-single',params: {category: item.category, id: item.id},query: {id: item.id}}">{{item.title}}</router-link>
                            <stat-info :reviews="item.reviews" />
                            <span class="category-item__price">{{item.price | filterCurrency}}</span>
                            <button class="category-item__add" @click.prevent="addProductCart(item)" v-if="!item.active">
                                Добавить в корзину <i class="material-icons">add_shopping_cart</i>               
                            </button>
                            <router-link to="/cart" tag="a" class="category-item__add category-item__add--modif" v-else>
                                Перейти в корзину <i class="material-icons">add_shopping_cart</i>                
                            </router-link>
                        </div>
                    </div>
                </li>
            </transition-group>
        </div>
    </div>
</template>

<script>
import StatInfo from "@/components/Stat-info"
import {mapGetters,mapActions} from "vuex"
export default {
    name: "brand",
    metaInfo() {
        return {
            title: `vue-shop | ${this.$route.params.brand}`

        }
    },
    data: ()=> ({
        
    }),
    components: {
        StatInfo
    },
    computed: {
        ...mapGetters(["PRODUCTS","CART"]),
        productsFIlter() {
            const cartID = this.CART.map(elem => elem.id);
            const mas = this.PRODUCTS.filter(el => {
                if(el.category === this.$route.params.category && el.brand === this.$route.params.brand.toLowerCase()) {
                    return el;
                }
            })

            return mas.map(el => {
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
    methods: {
        ...mapActions(["GET_PRODUCTS","ADD_CART",]),
        addProductCart(arr) {  
            const {id,title,img,counter,price,category} = arr;          
            this.ADD_CART({id,title,img,counter: counter + 1,price,category})
        },
        sortUp() {
            this.PRODUCTS.sort((a,b) => {
                return a.price - b.price
            })
        },
        sortDown() {
            this.PRODUCTS.sort((a,b) => {
                return b.price - a.price
            })
        }
    },
    async mounted() {
        await this.GET_PRODUCTS()
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
                & i {
                    margin-left: 10px;
                }
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