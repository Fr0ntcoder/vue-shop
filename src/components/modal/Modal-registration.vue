<template>
  <div class="modal-registration" @click.self="hideModal">
      <form class="modal-registration__form" @submit.prevent="registrationHandler">
          <button @click.prevent="hideModal" class="modal-registration__close"><i class="material-icons">close</i></button>
          <h3 class="modal-registration__title">Зарегистрироваться</h3>
          <div class="modal-registration__group">
              <label for="modal-registration__name">Имя:</label>
              <input type="text" name="modal-registration__name" id="modal-registration__name" :class="{invalid: $v.regName.$dirty && !$v.regName.required}" v-model.trim="regName">
              <span class="modal-registration__error" v-if="$v.regName.$dirty && !$v.regName.required">Введите имя</span>
          </div>
          <div class="modal-registration__group">
              <label for="modal-registration__email">Email:</label>
              <input type="text" name="modal-registration__email" id="modal-registration__email" :class="{invalid: ($v.regEmail.$dirty && !$v.regEmail.required) || ($v.regEmail.$dirty && !$v.regEmail.email)}" v-model.trim="regEmail">
              <span class="modal-registration__error" v-if="$v.regEmail.$dirty && !$v.regEmail.required">Введите email</span>
              <span class="modal-registration__error" v-if="$v.regEmail.$dirty && !$v.regEmail.email">Введите корректный email</span>
          </div>
          <div class="modal-registration__group">
              <label for="modal-registration__password">Пароль:</label>
              <input type="password" name="modal-registration__password" id="modal-registration__password" :class="{invalid: ($v.regPassword.$dirty && !$v.regPassword.required) || ($v.regPassword.$dirty && !$v.regPassword.minLength)}" v-model.trim="regPassword">
              <span class="modal-registration__error" v-if="$v.regPassword.$dirty && !$v.regPassword.required">Введите password</span>
              <span class="modal-registration__error" v-if="$v.regPassword.$dirty && !$v.regPassword.minLength">Минимальное количество символов({{this.$v.regPassword.$params.minLength.min}}),сейчас({{regPassword.length}})</span>
          </div>
          <input type="submit" value="Зарегистрироваться" class="modal-registration__btn">
      </form>
  </div>
</template>

<script>
import {mapActions} from "vuex"
import {required,email,minLength} from "vuelidate/lib/validators"
export default {
    name: "modal-regitration",
    data() {
        return {
            regName: "",
            regEmail: "",
            regPassword: ""
        }
    },
    validations: {
        regName: {required},
        regEmail: {email,required},
        regPassword: {required,minLength: minLength(6)}
    },
    methods: {
        ...mapActions(["HIDE_MODAL_REGISTRATION","REGISTRATION","SHOW_MODAL_MESSAGE"]),
       async registrationHandler() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return;
            }
            try {
                const formData = {
                    name: this.regName,
                    email: this.regEmail,
                    password: this.regPassword
                }
               await this.REGISTRATION(formData)
                this.HIDE_MODAL_REGISTRATION()
                this.SHOW_MODAL_MESSAGE({
                    title: "Вы успешно зарегистрировались!",
                    text: "Благодарим вас!",
                    active: true
                })

            }catch(e) {
                console.log(e)
            }
        },
        hideModal() {
            document.querySelector("body").classList.remove("hide")
            this.HIDE_MODAL_REGISTRATION()
        }
    },
}
</script>

<style lang="scss">
    .modal {
        &-registration {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: rgba(0,0,0,.8);
            z-index: 9999;
            &__error {
                position: absolute;
                left: 0;
                bottom: 0;
                font-size: 14px;
                color: red;
            }
            &__form {
                position: absolute;
                max-width: 400px;
                width: 100%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                padding: 30px;
                background: #fff;
            }
            &__title {
                font-size: 22px;
                margin-bottom: 30px;
            }
            &__group {
                position: relative;
                margin-bottom: 10px;
                padding-bottom: 20px;
                & label {
                    display: block;
                    font-size: 16px;
                    font-weight: 500;
                    margin-bottom: 5px;
                }
                & input {
                    display: block;
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #dfdcdc;
                    border-radius: 5px;
                    &.invalid {
                        border-color: red;
                    }
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
        } 
    }
</style>