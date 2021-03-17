<template>
  <header class="header">
      <div class="container">
          <div class="header-top">
              <a href="#" class="header-location">
                  <font-awesome-icon icon="map-marker-alt" />
                  <span class="header-location__text">Омск</span>
              </a>
          </div>
          <div class="header-center">
                <router-link tag="a" to="/" class="header-logo"><img src="@/assets/img/logo.png"></router-link>
                <div class="header-search">
                    <input type="search" class="header-search__input" placeholder="Поиск по каталогу" v-model="headerSearch">
                    <button class="header-search__btn" @click.prevent="headerSearchHandler">
                        <span class="header-search__btn-text">Найти</span>
                        <font-awesome-icon icon="search" />
                    </button>
                </div>
                <a href="#" class="header-register" @click.prevent="modalReg">
                  <font-awesome-icon icon="user"/>
                  <span class="header-register__text">Вход или регистрация</span>
                </a>
                <router-link to="/cart" tag="a" class="header-cart" :class="{active: cartLength}">
                    <span class="header-cart__icon">
                        <span class="header-cart__counter" v-if="cartLength">{{cartLength}}</span>
                        <font-awesome-icon icon="shopping-cart"/>
                    </span>
                    <span class="header-cart__text" v-if="cartLength">{{cartPrice | filterCurrency}}</span>
                    <span class="header-cart__text" v-else>Корзина</span>
                </router-link>
          </div>
          <nav class="header-nav">
              <ul class="header-nav__list">
                  <li v-for="(item,i) of headerNav" :key="i" class="header-nav__item">
                      <router-link tag="a" :to="{name: 'category', params: {category: item.categoryLink,name: item.title},query: {category: item.categoryLink,name: item.title}}" class="header-nav__link"><i class="material-icons">{{item.icon}}</i>{{item.title}}</router-link>
                      <ul class="header-drop__list">
                          <li v-for="(it,index) of item.brand" :key="index" class="header-drop__item">
                              <router-link tag="a" :to="{name: 'brand' ,params: {category: item.categoryLink, brand: it.title},query: {category: item.categoryLink, brand: it.title}}" class="header-drop__link">{{it.title}}</router-link>
                          </li>
                      </ul>
                  </li>
              </ul>
          </nav>
      </div>
  </header>
</template>

<script>
import {mapGetters,mapActions} from "vuex"
export default {
    name: "Header",
    data() {
        return {
            headerNav: [
                {
                    title: "Телевизоры",
                    categoryLink: "tv",
                    icon: "tv",
                    brand: [
                        {
                            title: "Samsung",
                            link: "/tv/samsung/"
                        },
                        {
                            title: "Lg",
                            link: "/tv/lg/"
                        },
                        {
                            title: "Philips",
                            link: "/tv/philips/"
                        },
                        {
                            title: "Sony",
                            link: "/tv/sony/"
                        },
                    ]
                },
                {
                    title: "Телефоны",
                    categoryLink: "phone",
                    icon: "phone_iphone",
                    brand: [
                        {
                            title: "Apple",
                            link: "/phone/apple/"
                        },
                        {
                            title: "Honor",
                            link: "/phone/honor/"
                        },
                        {
                            title: "Oppo",
                            link: "/phone/oppo/"
                        },
                        {
                            title: "Xiaomi",
                            link: "/phone/xiaomi/"
                        },
                        {
                            title: "Samsung",
                            link: "/phone/samsung/"
                        },
                    ]
                },
                {
                    title: "Ноутбуки",
                    categoryLink: "notebook",
                    icon: "laptop",
                    brand: [
                        {
                            title: "Apple",
                            link: "/notebook/apple/"
                        },
                        {
                            title: "Honor",
                            link: "/notebook/honor/"
                        }
                    ]
                },
                {
                    title: "Мониторы",
                    categoryLink: "monitor",
                    icon: "monitor",
                    brand: [
                        {
                            title: "Lg",
                            link: "/monitor/apple/"
                        },
                        {
                            title: "Philips",
                            link: "/monitor/philips/"
                        },
                        {
                            title: "Samsung",
                            link: "/monitor/samsung/"
                        }
                    ]
                },
                {
                    title: "Стиральные машины",
                    categoryLink: "washer",
                    icon: "speaker",
                    brand: [
                        {
                            title: "Lg",
                            link: "/washer/Lg/"
                        },
                        {
                            title: "Samsung",
                            link: "/washer/samsung/"
                        }
                    ]
                },
                {
                    title: "Холодильники",
                    categoryLink: "fridge",
                    icon: "kitchen",
                    brand: [
                        {
                            title: "Lg",
                            link: "/fridge/Lg/"
                        },
                        {
                            title: "Samsung",
                            link: "/fridge/samsung/"
                        }
                    ]
                },
                {
                    title: "Наушники",
                    categoryLink: "headphones",
                    icon: "headset",
                    brand: [
                        {
                            title: "Sennheiser",
                            link: "/headphones/sennheiser/"
                        },
                        {
                            title: "Sony",
                            link: "/headphones/sony/"
                        }
                    ]
                },
            ],
            headerSearch: "",
            cartCounter: []
        }
    },
    computed: {
        ...mapGetters(["CART"]),
        cartPrice() {
            if(!this.CART.length) {
                return "";
            }else {
                return this.CART.reduce((total,el) => {
                    return total + (el.price * el.counter);
                },0)
            }
        },
        cartLength() {
            if(!this.CART.length) {
                return false;
            }else {
                return this.CART.length;
            }
        }

    },
    methods: {
        ...mapActions(["SHOW_MODAL_REGISTRATION"]),
        modalReg() {
            this.SHOW_MODAL_REGISTRATION()
        }
    },
    mounted() {
    }
}
</script>

<style lang="scss">
.header {
    margin-bottom: 50px;
    &-nav {
        &__list {
            display: flex;
        }
        &__item {
            position: relative;
            margin-right: 30px;
            &:last-child {
                margin: 0;
            }
        }
        &__link {
            position: relative;
            display: inline-flex;
            font-size: 16px;
            padding: 15px 0;
            align-items: center;
            transition: color 0.3s ease-in-out;
            color: #000;
            & i {
                margin-right: 15px;
            }
            &:hover {
                color: var(--bg-color)
            }
        }
    }
    &-drop {
        &__list {
            position: absolute;
            width: 100%;
            top: 100%;
            left: 0;
            opacity: 0;
            margin: 0;
            visibility: hidden;
            border: 1px solid #000;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            transition: all 0.3s ease-in-out;
            background: #000;
            z-index: 9999;
        }
        &__link {
            display: block;
           font-size: 14px; 
           padding: 10px;
           transition: all 0.3s ease-in-out;
           color: #fff;
           &:hover {
               background: #fff;
               color: #000;
           }
        }
    }
    &-logo {
        display: block;
        max-width: 100px;
        width: 100%;
    }
    &-top {
        display: flex;
        padding: 15px 0 30px;
    }
    &-location {
        display: inline-flex;
        align-items: center;
        transition: all 0.3s ease-in-out;
        color: #000;
        &__text {
            font-size: 14px;
            margin-left: 10px;
        }
        &:hover {
            color: var(--bg-color)
        }
    }
    &-center {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 15px;
    }
    &-search {
        display: inline-flex;
        max-width: 500px;
        width: 100%;
        &__input {
            width: 80%;
            font-size: 14px;
            font-weight: 400;
            padding: 10px 5px;
            border: 2px solid var(--bg-color);
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
        }
        &__btn {
            display: inline-flex;
            width: 20%;
            min-height: 100%;
            align-items: center;
            justify-content: center;
            background: var(--bg-color);
            border: none;
            color: #fff;
            cursor: pointer;
            &-text {
                margin-right: 10px;
            }
        }
    }
    &-register {
        display: block;
        font-size: 14px;
        transition: all 0.3s ease-in-out;
        color: #000;
        &__text {
            margin-left: 5px;
        }
        &:hover {
            color: var(--bg-color)
        }
    }
    &-cart {
        display: block;
        font-size: 14px;
        padding: 15px;
        border-radius: 5px;
        transition: all 0.3s ease-in-out;
        color: #000;
        &__text {
            margin-left: 12px;
        }
        &:hover {
            color: var(--bg-color)
        }
        &.active {
            background: #000;
            color: #fff;
        }
        &__icon {
            position: relative;
            & svg {
                font-size: 20px;
            }
        }
        &__counter {
            display: inline-flex;
            position: absolute;
            top: -15px;
            right: -12px;
            width: 20px;
            height: 20px;
            font-size: 12px;
            font-weight: bolder;
            justify-content: center;
            align-items: center;
            background: #fff;
            border: 1px solid #000;
            border-radius: 50%;
            color: #000;
            
        }
    }
}
.header-nav__item:hover .header-drop__list {
    opacity: 1;
    visibility: visible;
}
</style>