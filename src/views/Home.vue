<template>
  <div class="inner-content">
      <div class="product-block__list">
        <Loader v-if="loader"/>
        <category-block  :category="item.category" :title="item.title" v-for="(item,i) of productsCategory" :key="i" v-else/> 
      </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader"
import CategoryBlock from "@/components/Category-block"
import {mapActions,mapGetters} from "vuex"
export default {
  name: 'Home',
  metaInfo() {
        return {
            title: "vue-shop | Главная страница"
        }
  },
  data: () => ({
    productsList: [],
    productsCategory: [
      {
        title: "Телевизоры",
        category: "tv"
      },
      {
        title: "Мониторы",
        category: "monitor"
      },
      {
        title: "Телефоны",
        category: "phone"
      },
      {
        title: "Ноутбуки",
        category: "notebook"
      },
      {
        title: "Стиральные машины",
        category: "washer"
      },
      {
        title: "Холодильники",
        category: "fridge"
      },
    ],
    loader: true
  }),
  components: {
    Loader,CategoryBlock
  },
  computed: {
    ...mapGetters(["PRODUCTS"]),

  },
  methods: {
    ...mapActions(["GET_PRODUCTS"]),
  },
  watch: {
  },
  async mounted() {
      await this.GET_PRODUCTS();
      this.productsList = this.PRODUCTS
      this.loader = false;
  },
}
</script>
<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .product {
    &-list {
      display: flex;
      flex-wrap: wrap;
    }
    &-load {
      &__btn {
        display: block;
        max-width: 150px;
        width: 100%;
        font-size: 16px;
        text-align: center;
        padding: 10px;
        margin: 0 auto;
        border-radius: 5px;
        background: var(--bg-color);
        color: #fff;
      }
    }
    &-item {
      width: 33.33%;
      padding: 0 15px;
      margin-bottom: 50px;
      &__btn {
        display: block;
        font-size: 18px;
        text-align: center;
        padding: 15px;
        background: var(--bg-color);
        color: #fff;
        & svg {
          margin-left: 10px;
        }
      }
      &__price {
        display: block;
        font-size: 22px;
        font-weight: 900;
        margin-bottom: 15px;
      }
      &__wrap {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;
      }
      &__title {
        display: block;
        min-height: 50px;
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 10px;
        color: #000;
      }
      &__img {
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
        margin: 0 auto 15px;
        &-phone {
          max-width: 100px;
          width: 100%;
        }
        &-tv {
          max-width: 250px;
        }
        &-notebook {
          max-width: 250px;
        }
        &-headphones {
          max-width: 100px;
        }
        &-washer {
          max-width: 100px;
        }
        &-fridge {
          max-width: 100px;
        }
      }
      &__rating {
        &-list {
          display: flex;
          margin-right: 10px;
        }
        &-item {
          font-size: 16px;
          color: var(--bg-color);
        }
  
      }
      &__info {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
      }
      &__reviews {
        display: flex;
        font-size: 14px;
        align-items: center;
        &-counter {
          margin-right: 5px;
        }
      }
    }
  }
</style>
