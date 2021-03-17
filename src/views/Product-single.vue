<template>
  <div class="product-single">
        <div class="product-single__wrap">
            <div class="product-single__left">
                <h3 class="product-single__title">{{getProduct.title}}</h3>
                <div class="product-single__info">
                    <ul class="product-single__info-list">
                        <li class="product-single__info-item" v-for="n of 5" :key="n">
                            <i class="material-icons" v-if="n <= averageRating">star</i>
                            <i class="material-icons" v-else>star_border</i>
                        </li>
                    </ul>
                    <div class="product-single__info-reviews">
                        <span class="" v-if="getProduct.reviews != '[]'">{{Object.values(getProduct.reviews).length | filterText}}</span>
                        <span v-else>Нет отзывов</span>
                    </div>
                </div>
                <div class="product-single__slider-wrap">
                    <div class="product-single__slider-top" :style="`background-image: url(${getImg})`">
                    </div>
                    <div class="product-single__slider">
                        <a href="#" class="product-single__slider-btn product-single__slider-prev" v-if="getProduct.gallery.length > 4" @click.prevent="prevSlide">
                            <i class="material-icons">arrow_back_ios</i>
                        </a>
                        <a href="#" class="product-single__slider-btn product-single__slider-next" v-if="getProduct.gallery.length > 4" @click.prevent="nextSlide">
                            <i class="material-icons">arrow_forward_ios</i>
                        </a>
                        <div class="product-single__slider-wrapper">
                            <ul ref="productSlider" class="product-single__slider-list" :class="{center: getProduct.gallery.length < 4 }">
                                <li class="product-single__slider-item" v-for="(item,i) of getProduct.gallery" :key="i">
                                    <a href="#" class="product-single__slider-link" :style="`background-image: url(${item.img})`" :data-src="item.img" @click.prevent="sliderImgHandler($event)">
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="product-single__right">
                <h4 class="product-single__subtitle">Цена</h4>
                <span class="product-single__price">{{getProduct.price | filterCurrency}}</span>  
                <button class="product-single__btn" @click.prevent="addProductCart(getProduct)" v-if="!getProduct.active">
                    Добавить в корзину <i class="material-icons">add_shopping_cart</i>              
                </button>
                <router-link to="/cart" tag="a" class="product-single__link" v-else>
                    Перейти в корзину <i class="material-icons">add_shopping_cart</i>            
                </router-link>
            </div>
        </div>
        <ul class="product-single__tab-list">
            <li class="product-single__tab-item">
                <a href="#" class="product-single__tab-link" @click.prevent="tabHandler($event)" data-tab="0" :class="{active: tabIndex === 0}">Описание</a>
            </li>
            <li class="product-single__tab-item">
                <a href="#" class="product-single__tab-link" @click.prevent="tabHandler($event)" data-tab="1" :class="{active: tabIndex === 1}">Отзывы</a>
            </li>
            <li class="product-single__tab-item">
                <a href="#" class="product-single__tab-link" @click.prevent="tabHandler($event)" data-tab="2" :class="{active: tabIndex === 2}">Текст</a>
            </li>
            <li class="product-single__tab-item">
                <a href="#" class="product-single__tab-link" @click.prevent="tabHandler($event)" data-tab="3" :class="{active: tabIndex === 3}">Текст</a>
            </li>
        </ul>
        <div class="product-single__tab-wrap">
            <div class="product-single__tab-content" v-show="tabIndex === 0">
                <p class="product-single__tab-text">{{getProduct.description}}</p>
            </div>
            <div class="product-single__tab-content"  v-show="tabIndex === 1">
                <div class="product-single__tab-wrapper">
                    <a href="#" class="product-single__add" @click.prevent="addReviews"><i class="material-icons">create</i>Написать отзыв</a>
                </div>
                <div class="" v-if="getProduct.reviews != '[]'">
                    <div class="product-single__reviews-list" v-for="item of Object.values(getProduct.reviews)" :key="item.id">
                        <div class="product-single__reviews-left">
                            <h4 class="product-single__reviews-title">{{item.name}}</h4>
                            <span class="product-single__reviews-city">{{item.city}}</span>
                            <span class="product-single__reviews-date">{{item.date | date("date")}}</span>
                        </div>
                        <div class="product-single__reviews-right">
                            <ul class="product-single__rating-list">
                                <li class="product-single__rating-item" v-for="n of 5" :key="n">
                                    <i class="material-icons" v-if="n <= item.rating">star</i>
                                    <i class="material-icons" v-else>star_border</i>
                                </li>
                            </ul>
                            <p class="product-single__reviews-description">{{item.text}}</p>
                        </div>
                    </div>
                </div>
                <p v-else class="product-single__reviews-empty">Нет отзывов</p>
            </div>
            <div class="product-single__tab-content" v-show="tabIndex === 2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, illo, perferendis dolorem ullam fuga nulla optio id numquam dignissimos cum illum consequuntur eveniet doloribus sit ipsa mollitia, nam quo rerum!
            </div>
            <div class="product-single__tab-content" v-show="tabIndex === 3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, illo, perferendis dolorem ullam fuga nulla optio id numquam dignissimos cum illum consequuntur eveniet doloribus sit ipsa mollitia, nam quo rerum!
            </div>
        </div>
  </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex"
export default {
    metaInfo() {
        return {
            title: `vue-shop | Купить ${this.PRODUCTS_ID(Number.parseInt(this.$route.params.id)).title} по выгодной цене`
        }
    },
    name: "product-single",
    data: () => ({
      tabIndex: 0,
      getImg: "",
      counter: 4,
      slideWidth: 0,
      counterWidth: 0
    }),
    computed: {
      ...mapGetters(["PRODUCTS_ID","CART"]),
      getProduct() {
            const cartID = this.CART.map(elem => elem.id);
            const product = this.PRODUCTS_ID(Number.parseInt(this.$route.params.id))
            if(cartID.includes(Number.parseInt(this.$route.params.id))) {
                product.active = true;
                return product
            }else {
                product.active = false;
                return product
            }
      },
      averageRating() {
          const sum = Object.values(this.getProduct.reviews).reduce((total,el) => {
              return total + el.rating;
          },0)
          return Math.ceil(sum/Object.values(this.getProduct.reviews).length);
      },
      result() {
            this.getImg = this.PRODUCTS_ID(Number.parseInt(this.$route.params.id)).gallery[0].img;
      }
    },
    methods: {
      ...mapActions(["GET_PRODUCTS","SHOW_MODAL_REVIEWS","ADD_CART"]),
      addProductCart(arr) {  
            const {id,title,img,counter,price,category} = arr;          
            this.ADD_CART({id,title,img,counter: counter + 1,price,category})
        },
      tabHandler(e) {
          this.tabIndex = +e.target.dataset.tab;
      },
      addReviews() {
          document.querySelector("body").classList.add("hide")
          return this.SHOW_MODAL_REVIEWS();
      },
      sliderImgHandler(e) {
          return this.getImg = e.target.dataset.src;
      },
      nextSlide() {
          this.slideWidth = Math.ceil(this.$refs.productSlider.offsetWidth/4)
          if(this.counter != this.getProduct.gallery.length) {
                this.counter++;
                this.counterWidth += this.slideWidth;
                this.$refs.productSlider.style.transform = `translateX(-${this.counterWidth}px)`;
                console.log(this.counter)
          }
      },
      prevSlide() {
          this.slideWidth = Math.ceil(this.$refs.productSlider.offsetWidth/4)
          if(this.counter != 4) {
                this.counter--;
                this.counterWidth -= this.slideWidth;
                this.$refs.productSlider.style.transform = `translateX(-${this.counterWidth}px)`;
                console.log(this.counter)
          }
      }
    },
    async mounted() {
        await this.GET_PRODUCTS();
        this.getImg = this.PRODUCTS_ID(Number.parseInt(this.$route.params.id)).gallery[0].img;
        this.id = this.PRODUCTS_ID(Number.parseInt(this.$route.params.id))
    }
}
</script>

<style lang="scss">
    .product {
        &-single {
            &__link {
                display: inline-flex;
                font-size: 18px;
                align-items: center;
                padding: 15px 30px;
                border: none;
                border-radius: 5px;
                background: red;
                color: #fff;
                cursor: pointer;
                & i {
                    margin-left: 10px;
                }
            }
            &__rating {
                &-list {
                    display: inline-flex;
                    margin-bottom: 15px;
                }
                &-item {
                    margin-right: 10px;
                    color: var(--bg-color);
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
            &__add {
                display: inline-flex;
                font-size: 14px;
                align-items: center;
                padding: 10px 20px;
                border-radius: 5px;
                background: var(--bg-color);
                transition: all 0.3s ease-in-out;
                color: #fff;
                & i {
                    margin-right: 10px;
                }
            }
            &__reviews {
                &-empty {
                    font-size: 18px;
                    margin: 30px 0;
                }
                &-left {
                    width: 30%;
                    padding-right: 30px;
                }
                &-right {
                    width: 70%;
                }
                &-list {
                    display: flex;
                    padding-bottom: 30px;
                    margin-bottom: 50px;
                    border-bottom: 1px solid #e7e5e5;
                }
                &-title {
                    font-size: 18px;
                }
                &-city {
                    display: block;
                    font-size: 14px;
                    margin: 5px 0;
                    color: #908e8e;
                }
                &-date {
                    display: block;
                    font-size: 14px;
                    color: #908e8e;
                }
                &-description {
                    font-size: 14px;
                }
                /* &-text {

                } */
            }
            &__tab {
                &-wrapper {
                    display: flex;
                    justify-content: flex-end;
                    padding-bottom: 15px;
                    margin-bottom: 15px;
                    border-bottom: 1px solid #e7e5e5;
                }
                &-text {
                    font-size: 16px;
                    line-height: 1.4;
                }
                &-list {
                    display: flex;
                    margin-bottom: 30px;
                }
                &-link {
                    display: block;
                    font-size: 16px;
                    font-weight: 700;
                    text-align: center;
                    padding: 15px 30px;
                    border: 1px solid var(--bg-color);
                    transition: all 0.3s ease-in-out;
                    color: #000;
                    &:hover {
                        background: var(--bg-color);
                        color: #fff;
                    }
                    &.active {
                        background: var(--bg-color);
                        color: #fff;
                    }
                }
                &-item {
                    width: 25%;
                    & .product-single__tab-link {
                        border-right: 0;
                    }
                    &:last-child .product-single__tab-link {
                        border-right: 1px solid var(--bg-color);
                    }
                }
            }
            &__wrap {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                margin-bottom: 50px;
            }
            &__btn {
                display: flex;
                font-size: 18px;
                align-items: center;
                padding: 15px 30px;
                border: none;
                border-radius: 5px;
                background: var(--bg-color);
                color: #fff;
                cursor: pointer;
                & i {
                    margin-left: 10px;
                }
            }
            &__price {
                display: block;
                font-size: 20px;
                font-weight: 700;
                margin-bottom: 30px;
            }
            &__left {
                width: 50%;
                padding-right: 30px;
            }
            &__right {
                width: 30%;
                padding: 30px;
                border: 2px solid var(--bg-color);
                border-radius: 5px;
            }
            &__title {
                font-size: 22px;
                margin-bottom: 15px;
            }
            &__subtitle {
                font-size: 22px;
                margin-bottom: 15px;
            }
            &__info {
                display: flex;
                align-items: center;
                margin-bottom: 30px;
                &-list {
                    display: flex;
                    margin-right: 15px;
                }
            }
            &__slider {
                position: relative;
                display: block;
                max-width: 500px;
                width: 100%;
                margin: 0 auto;
                padding: 0 30px;
                &-wrapper {
                    overflow-x: hidden;
                }
                &-btn {
                    font-size: 16px;
                    color: #000;
                }
                &-prev {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                }
                &-next {
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                }
                &-list {
                    display: flex;
                    transition: all 0.3s ease-in-out;
                    &.center {
                        justify-content: center;
                    }
                }
                &-item {
                    width: 25%;
                    flex-shrink: 0;
                    padding: 0 15px;
                }
                &-link {
                    display: flex;
                    height: 100%;
                    align-items: center;
                    border: 1px solid #c4c1c1;
                    border-radius: 5px;
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: contain;
                    &::after {
                        content: "";
                        display: block;
                        padding-top: 100%;
                    }
                    &.active {
                        border-color: var(--bg-color);
                    }
                }
                &-top {
                    max-width: 400px;
                    width: 100%;
                    margin: 0 auto 30px;
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: contain;
                    &::after {
                        content: "";
                        display: block;
                        padding-top: 80%;
                    }
                }
            }
        }
    }
</style>