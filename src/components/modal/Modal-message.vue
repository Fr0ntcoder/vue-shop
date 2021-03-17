<template>
  <div class="cart-message" @click.self="hideModal" v-if="MODAL_MESSAGE.active">
      <div class="cart-message__content">
          <h3 class="cart-message__title">{{MODAL_MESSAGE.title}}</h3>
          <p class="cart-message__text">{{MODAL_MESSAGE.text}}</p>
          <button @click.prevent="hideModal" class="cart-message__btn"><i class="material-icons">close</i></button>
      </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex"
export default {
    name: "modal",
    computed: {
        ...mapGetters(["MODAL_MESSAGE"]),
        
    },
    methods: {
        ...mapActions(["HIDE_MODAL_MESSAGE"]),
        hideModal() {
            document.querySelector("body").classList.remove("hide")
            return this.HIDE_MODAL_MESSAGE()
        }
    },
    mounted() {
        this.HIDE_MODAL_MESSAGE()
    }
}
</script>

<style lang="scss">
    .cart {
        &-message {
            position: fixed;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            transform: translate(-50%,-50%);
            background: rgba(0,0,0,.8);
            z-index: 9999;
            &__content {
                position: absolute;
                max-width: 400px;
                width: 100%;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                padding: 30px;
                background: #fff;
            }
            &__title {
                font-weight: 700;
                font-size: 20px;
                text-align: center;
                margin-bottom: 15px;
            }
            &__text {
                font-size: 18px;
                text-align: center;
            }
            &__btn {
                position: absolute;
                display: flex;
                top: -10px;
                right: -10px;
                width: 30px;
                height: 30px;
                justify-content: center;
                border: none;
                align-items: center;
                border-radius: 50%;
                background: var(--bg-color);
                color: #fff;
                cursor: pointer;
            }
        }
    }
</style>