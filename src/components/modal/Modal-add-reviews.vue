<template>
  <div class="modal-reviews" @click.self="modalReviewsHide">
      <form class="modal-reviews__form" @submit.prevent="formReviews">
          <a href="#" class="modal-reviews__close" @click.prevent="modalReviewsHide">
              <i class="material-icons">close</i>
          </a>
          <h3 class="modal-reviews__title">Написать отзыв</h3>
          <div class="modal-reviews__group">
              <label for="modal-reviews__name">Ваше имя:</label>
              <input type="text" name="modal-reviews__name" id="modal-reviews__name" v-model="modalReviewsName"  :class="{invalid: $v.modalReviewsName.$dirty && !$v.modalReviewsName.required}">
              <span class="modal-reviews__error" v-if="$v.modalReviewsName.$dirty && !$v.modalReviewsName.required">Это поле обязательно для заполнения</span>
          </div>
          <div class="modal-reviews__group">
              <label for="modal-reviews__city">Город:</label>
              <input type="text" name="modal-reviews__city" id="modal-reviews__city" v-model="modalReviewsCity" :class="{invalid: $v.modalReviewsCity.$dirty && !$v.modalReviewsCity.required}">
              <span class="modal-reviews__error" v-if="$v.modalReviewsCity.$dirty && !$v.modalReviewsCity.required">Это поле обязательно для заполнения</span>
          </div>
          <div class="modal-reviews__group">
              <label for="modal-reviews__email">Email:</label>
              <input type="text" name="modal-reviews__email" id="modal-reviews__email" v-model="modalReviewsEmail" :class="{invalid: ($v.modalReviewsEmail.$dirty && !$v.modalReviewsEmail.required) || ($v.modalReviewsEmail.$dirty && !$v.modalReviewsEmail.email)} ">
              <span class="modal-reviews__error" v-if="$v.modalReviewsEmail.$dirty && !$v.modalReviewsEmail.required">Это поле обязательно для заполнения</span>
              <span class="modal-reviews__error" v-else-if="$v.modalReviewsEmail.$dirty && !$v.modalReviewsEmail.email">Введите корректный email</span>
          </div>
          <div class="modal-reviews__rating">
              <label for="">Оценка:</label>
              <ul class="modal-reviews__rating-list">
                    <li class="modal-reviews__rating-item" v-for="n of ratingList" :key="n.index" :title="n.text">
                        <a href="#" class="modal-reviews__rating-link material-icons" v-if="n.index <= rating" :data-index="n.index" @click.prevent="ratingHandler($event)">star</a>
                        <a href="#" class="modal-reviews__rating-link material-icons" :data-index="n.index" @click.prevent="ratingHandler($event)" v-else>star_border</a>
                    </li>
              </ul>
          </div>
          <div class="modal-reviews__group">
              <label for="">Отзыв:</label>
              <textarea name="modal-reviews__text" v-model="modalReviewsText" :class="{invalid: ($v.modalReviewsText.$dirty && !$v.modalReviewsText.required) || ($v.modalReviewsText.$dirty && !$v.modalReviewsText.minLength)} "></textarea>
              <span class="modal-reviews__error" v-if="$v.modalReviewsText.$dirty && !$v.modalReviewsText.required">Это поле обязательно для заполнения</span>
              <span class="modal-reviews__error" v-else-if="$v.modalReviewsText.$dirty && !$v.modalReviewsText.minLength">Минимальное количество символов({{this.$v.modalReviewsText.$params.minLength.min}}),сейчас({{modalReviewsText.length}})</span>
          </div>
          <input type="submit" class="modal-reviews__btn" value="Отправить">
      </form>
  </div>
</template>

<script>
import {mapActions} from "vuex"
import {email, required, minLength} from 'vuelidate/lib/validators';
export default {
    name: "modal-add-reviews",
    data() {
        return {
            modalReviewsName: "",
            modalReviewsCity: "",
            modalReviewsEmail: "",
            modalReviewsText: "",
            ratingList: [
                {
                    index: 1,
                    text: "Очень плохо"
                },
                {
                    index: 2,
                    text: "Плохо"
                },
                {
                    index: 3,
                    text: "Средне"
                },
                {
                    index: 4,
                    text: "Хорошо"
                },
                {
                    index: 5,
                    text: "Отлично"
                },
            ],
            rating: 5
        }
    },
    validations: {
        modalReviewsName: {required},
        modalReviewsCity: {required},
        modalReviewsEmail: {required, email},
        modalReviewsText: {required, minLength: minLength(5)},
    },
    computed: {
    },
    methods: {
        ...mapActions(["SHOW_MODAL_MESSAGE","HIDE_MODAL_REVIEWS","ADD_REVIEWS"]),
        ratingHandler(e) {
            this.rating = +e.target.dataset.index
        },
        modalReviewsHide() {
            document.querySelector("body").classList.remove("hide")
            return this.HIDE_MODAL_REVIEWS()
        },
        async formReviews() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return;
            }
            try {
                const formData = {
                    id: Number.parseInt(this.$route.params.id),
                    name: this.modalReviewsName,
                    city: this.modalReviewsCity,
                    email: this.modalReviewsEmail,
                    text: this.modalReviewsText,
                    date: new Date().toJSON(),
                    rating: this.rating
                }
                await this.ADD_REVIEWS(formData)
                document.querySelector("body").classList.remove("hide")
                this.HIDE_MODAL_REVIEWS()
                this.SHOW_MODAL_MESSAGE({
                    title: "Вы оставили отзыв!",
                    text: "Благодарим вас!",
                    active: true
                })
            }catch(e) {
                console.log(e)
            }

        }
    }
}
</script>

<style lang="scss">
  .modal {
    &-reviews {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.8);
        z-index: 9999;
        &__error {
            position: absolute;
            left: 0;
            bottom: 0;
            font-size: 14px;
            color: red;
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
        &__btn {
            display: block;
            font-size: 16px;
            margin: 0 auto;
            background: var(--bg-color);
            padding: 10px 30px;
            border-radius: 5px;
            color: #fff;
            cursor: pointer;
        }
        &__form {
            position: absolute;
            left: 50%;
            top: 50%;
            max-width: 500px;
            width: 100%;
            padding: 30px;
            transform: translate(-50%,-50%);
            background: #fff;
        }
        &__title {
            font-size: 22px;
            margin-bottom: 15px;
        }
        &__group {
            position: relative;
            margin-bottom: 10px;
            padding-bottom: 20px;
            & label {
                display: block;
                font-size: 16px;
                font-weight: 500;
                margin-bottom: 10px;
            }
            & input {
                width: 100%;
                padding: 5px;
                border-radius: 2px;
                border: 1px solid var(--bg-color);
                &.invalid {
                    border-color: red;
                }
            }
            & textarea {
                width: 100%;
                height: 150px;
                padding: 10px 5px;
                border-radius: 2px;
                border: 1px solid var(--bg-color);
                resize: none;
                &.invalid {
                    border-color: red;
                }
            }
        }
        &__rating {
            margin-bottom: 15px;
            & label {
                display: block;
                font-size: 16px;
                font-weight: 500;
                margin-bottom: 10px;
            }
            &-list {
                display: flex;
                justify-content: space-between;
            }
            &-item {
                width: 20%;
                & .modal-reviews__rating-link {
                    border-right: none;
                }
                &:last-child .modal-reviews__rating-link {
                    border: 1px solid var(--bg-color)
                }
            }
            &-link {
                display: flex !important;
                height: 100%;
                justify-content: center;
                align-items: center;
                padding: 10px;
                border: 1px solid var(--bg-color);
                color: var(--bg-color);
                & i {
                    font-size: 20px;
                }
            }
        }
    }
  }
</style>