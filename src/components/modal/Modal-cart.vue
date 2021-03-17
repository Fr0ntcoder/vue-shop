<template>
  <div class="cart-modal" @click.self="closeModalCart" v-if="MODAL_CART">
      <div class="cart-modal__content">
          <button @click.prevent="closeModalCart" class="cart-modal__close"><i class="material-icons">close</i></button>
          <h3 class="cart-modal__title">Оформить заказ</h3>
          <form action="" class="cart-form" @submit.prevent="cartSubmit">
                <div class="cart-form__group">
                    <label for="cart-form__name">Имя:</label>
                    <input type="text" name="cart-form__name" id="cart-form__name" class="cart-form__input" v-model.trim="cartName" :class="{invalid: ($v.cartName.$dirty && !$v.cartName.required) || ($v.cartName.$dirty && !$v.cartName.minLength)
                    }">
                </div>
                <div class="cart-form__group">
                    <label for="cart-form__email">Email:</label>
                    <input type="text" name="cart-form__email" id="cart-form__email" class="cart-form__input"  v-model.trim="cartEmail" :class="{invalid: ($v.cartEmail.$dirty && !$v.cartEmail.required) || ($v.cartEmail.$dirty && !$v.cartEmail.email)}">
                </div>
                <div class="cart-form__group">
                    <label for="cart-form__phone">Номер телефона:</label>
                    <input type="phone" name="cart-form__phone" id="cart-form__phone" class="cart-form__input"  v-model.trim="cartPhone" :class="{invalid: $v.cartPhone.$dirty && !$v.cartPhone.required
                    }">
                </div>
                <input type="submit" value="Отправить" class="cart-form__btn">
          </form>
      </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"
import {email,required,minLength} from "vuelidate/lib/validators"
export default {
    name: "cart-modal",
    data() {
        return {
            cartName: "",
            cartEmail: "",
            cartPhone: ""
        }
    },
    validations: {
        cartName: {required,minLength: minLength(2)},
        cartEmail: {email,required},
        cartPhone: {required}
    },
    computed: {
        ...mapGetters(["CART","MODAL_CART"]),
    },
    methods: {
        ...mapActions(["CART_SEND"]),
        ...mapActions(["SHOW_MODAL_MESSAGE","HIDE_MODAL_CART"]),
        closeModalCart() { 
            document.querySelector("body").classList.remove("hide")
            this.HIDE_MODAL_CART()
        },
        async cartSubmit() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            const formData = {
                name: this.cartName,
                email: this.cartEmail,
                phone: this.cartPhone,
                product: this.CART
            }

            try{
                await this.CART_SEND(formData)
                this.HIDE_MODAL_CART()
                this.SHOW_MODAL_MESSAGE({
                    title: "Вы оставили заказ!",
                    text: "Наш менеджер свяжется с вами в ближайшее время!",
                    active: true
                })
            }catch(e) {
                console.log(e)
            }
        }
    },
    mounted() {
        this.HIDE_MODAL_CART()
    }
}
</script>

<style lang="scss">
    .cart {
        &-modal {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            background: rgba(0,0,0,.8);
            z-index: 9999;
            &__close {
                position: absolute;
                display: flex;
                top: -10px;
                right: -10px;
                width: 30px;
                height: 30px;
                justify-content: center;
                align-items: center;
                background: var(--bg-color);
                color: #fff;
                border: none;
                border-radius: 50%;
                cursor: pointer;
            }
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
                font-size: 22px;
                margin-bottom: 30px;
            }
        }  
        &-form {
            &__group {
                margin-bottom: 15px;
                & label {
                    display: block;
                    font-size: 16px;
                    font-weight: 500;
                    margin-bottom: 5px;
                }
            }
            &__input {
                display: block;
                width: 100%;
                padding: 10px;
                border: 1px solid #dfdcdc;
                border-radius: 5px;
                &.invalid {
                    border-color: red;
                }
            }
            &__btn {
                display: block;
                font-size: 16px;
                padding: 10px 30px;
                margin: 30px auto 0;
                border-radius: 5px;
                background: var(--bg-color);
                color: #fff;
                cursor: pointer;
            }
        }
    }
</style>