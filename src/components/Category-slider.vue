<template>
    <div class="category-slider">
        <div class="category-slider__wraper" ref="slideWrap" >
            <div class="category-slide" v-for="(item,i) of productsResult" :key="i" >
                <div class="category-slide__wrap" ref="slide">
                    <span :class="`category-slide__img category-slide__img--${item.category}`">
                        <img :src="item.img" alt="">
                    </span>
                    <div class="category-slide__content">
                        <router-link class="category-slide__title" tag="a" :to="{name: 'product-single',params: {category: item.category, id: item.id},query: {id: item.id}}">
                            {{item.title}}
                        </router-link>
                        <div class="category-slide__stat">
                            <ul class="category-slide__rating-list">
                                <li class="category-slide__rating-item" v-for="(n,i) of 5" :key="i">
                                    <i class="material-icons" v-if="n <= item.rating">star</i>
                                    <i class="material-icons" v-else>star_border</i>
                                </li>
                            </ul>
                            <span class="category-slide__reviews" v-if="item.reviews != '[]'">{{Object.values(item.reviews).length | filterText}}</span>
                            <span class="category-slide__reviews" v-else>Нет отзывов</span>
                        </div>
                        <span class="category-slide__price">{{item.price | filterCurrency}}</span>
                        <button class="category-slide__add" @click.prevent="addProductCart(item)" v-if="!item.active">
                            <span class="category-slide__add-text">Добавить в корзину <font-awesome-icon icon="shopping-cart"/></span>               
                        </button>
                        <router-link to="/cart" tag="a" class="category-slide__add category-slide__add--modif" v-else>
                            <span class="category-slide__add-text">Перейти в корзину <font-awesome-icon icon="shopping-cart"/></span>               
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <button class="category-slide__btn category-slide__btn-prev" @click.prevent="sliderPrev()"><font-awesome-icon icon="chevron-left" /></button>
        <button class="category-slide__btn category-slide__btn-next" @click.prevent="sliderNext()"><font-awesome-icon icon="chevron-right" /></button>
    </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"
export default {
    props: {
        productsCategory: Array,
        sliderWidth: Number
    },
    name: "category-slider",
    data() {
        return {
            counter: 0,
            stepNext: 0,
            maxWidth: 0,
        }
    },
    computed: {
       ...mapGetters(["PRODUCTS","CART"]), 
       productsResult() {
           return this.productsCategory.map(el => {
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
    methods: {
        ...mapActions(["GET_PRODUCTS","ADD_CART"]),
        addProductCart(arr) {  
            const {id,title,img,counter,price,category} = arr;          
            this.ADD_CART({id,title,img,counter: counter + 1,price,category})
        },
        sliderNext() {
            if(this.counter != this.productsCategory.length - 4) {
                console.log(this.counter)
                this.counter++;
                this.stepNext += Math.ceil(this.$refs.slide[0].offsetWidth);
                this.$refs.slideWrap.style.transform = `translateX(-${this.stepNext}px)`
            }else if(this.counter === 16) {
                this.maxWidth = this.stepNext;
                this.counter = 0;
                this.stepNext = 0;
                this.$refs.slideWrap.style.transform = `translateX(0px)`
            }
        },
        sliderPrev() {
            if(this.counter > 0) {
                this.counter--;
                this.stepNext -= Math.ceil(this.$refs.slide[0].offsetWidth);
                this.$refs.slideWrap.style.transform = `translate(-${this.stepNext}px)`
            }else {
                this.$refs.slideWrap.style.transform = `translate(-${this.maxWidth}px)`
            }
        }
    },
    watch: {
    },
    async mounted() {
        await this.GET_PRODUCTS()
    }
}
</script>

<style lang="scss">
    .category {
        &-slide {
            width: 25%;
            flex-shrink: 0;
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
                & svg {
                    margin-left: 15px;
                }
                &.active {
                    background: red;
                }
                &--modif {
                    background: red;
                }
            }
            &__stat {
                display: flex;
                align-items: center;
                margin: 15px 0;
            }
            &__reviews {
                font-size: 14px;
            }
            &__rating {
                &-list {
                    display: flex;
                    margin-right: 15px;
                }
                &-item {
                    font-size: 16px;
                }
            }
            &__title {
                display: block;
                font-weight: 900;
                min-height: 50px;
                color: #333;
            }
            &__wrap {
                display: flex;
                height: 100%;
                flex-direction: column;
                justify-content: space-between;
                padding: 0 15px;
            }
            &__btn {
                position: absolute;
                font-size: 16px;
                border: none;
                padding: 15px;
                background: rgba(255,255,255,.8);    
                box-shadow: 0 0 2px 0 rgba(0,0,0,.5);  
                z-index: 999;
                cursor: pointer;
                &-prev {
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                }
                &-next {
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                }
            }
            &__img {
                display: block;
                min-height: 20px;
                margin: 0 auto 15px;
                &--phone {
                    max-width: 100px;
                    width: 100%;
                }
                &--washer {
                    max-width: 150px;
                    width: 100%;
                }
                &--fridge {
                    max-width: 80px;
                    width: 100%;
                }
            }
            &__price {
                display: block;
                font-size: 22px;
                font-weight: 900;
                margin-bottom: 30px;
            }
        }
        &-slider {
            position: relative;
            overflow-x: hidden;
            &__wrap {
                &-btn {
                    position: absolute;
                    display: flex;
                    width: 100%;
                    top: 50%;
                    left: 0;
                    transition: all 0.3s ease-in-out;
                    justify-content: space-between;
                    transform: translateY(-50%); 
                    opacity: 0.6; 
        }
            }
            &__item {
                font-size: 14px;
            }
            &__wraper {
                position: relative;
                display: flex;
                transition: all 0.3s ease-in-out;
            }
        }
    }
    .category-slider:hover .category-slider__wrap-btn {
        opacity: 1;
    }
    .category-slide__add .category-slide__add-text {
        display: none;
    }
    .category-slide__add .category-slide__add-text:nth-child(1) {
        display: block;
    }
    .category-slide__add .category-slide__add-text:nth-child(2) {
        display: none;
    }
    .category-slide__add.active .category-slide__add-text:nth-child(1) {
        display: none;
    }
    .category-slide__add.active .category-slide__add-text:nth-child(2) {
        display: block;
    }
</style>