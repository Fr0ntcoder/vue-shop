<template>
  <div class="product-block">
      <h3 class="product-block__title">{{title}}</h3>
      <category-slider  
      :productsCategory="productsCategory"
      />
  </div>
</template>

<script>
import CategorySlider from "@/components/Category-slider"
import {mapGetters,mapActions} from "vuex"
export default {
    props: {
        title: String,
        category: String,
    },
    name: "category-block",
    components: {
        CategorySlider
    },
    computed: {
        ...mapGetters(["PRODUCTS_CAT","CART"]),
        productsCategory() {
            return this.PRODUCTS_CAT(this.category)
        }

    },
    methods: {
        ...mapActions(["GET_PRODUCTS"]),
    },
    mounted() {
    }
}
</script>

<style lang="scss">
    .product {
        &-block {
            margin-bottom: 50px;
            &__title {
                font-size: 30px;
                margin-bottom: 15px;
                color: #333;
            }  
        }
    }
</style>