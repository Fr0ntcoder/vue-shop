<template>
  <footer class="footer">
      <div class="container">
          <div class="footer-wrap">
              <a href="#" class="footer-logo"><img src="@/assets/img/logo.png" alt=""></a>
              <form action="" @submit.prevent="footerHandler" class="footer-form">
                    <div class="footer-form__group">
                        <input type="email" v-model="footerNews" class="footer-form__text" placeholder="Email">
                        <input type="submit" value="Подписаться" class="footer-form__btn">    
                    </div>
                    <span class="footer-form__checkbox">
                        <input type="checkbox" id="footer-form__checkbox-input" name="footer-form__checkbox-input" v-model="footerCheckbox" class="footer-form__checkbox-input" checked>
                        <label for="footer-form__checkbox-input">Cогласен на обработку персональных данных</label>
                    </span>
              </form>
          </div>
          <div class="footer-bottom">
             <span class="footer-bottom__copy">© Frontcoder, 2021</span> 
             <ul class="footer-bottom__list">
                 <router-link tag="li" exact :to="item.link" v-for="(item,i) of footerBottomList" :key="i" class="footer-bottom__item">
                     <a href="#" class="footer-bottom__link">{{item.title}}</a>
                 </router-link>
             </ul>
          </div>
      </div>
  </footer>
</template>

<script>
export default {
    name: "Footer",
    data() {
        return {
            footerCheckbox: true,
            footerNews: "",
            footerBottomList: [
                    {
                        title: "Политика конфидециальности",
                        link: "/polit"
                    },
                    {
                        title: "Публичная оферта",
                        link: "/oferta"
                    },
                    {
                        title: "Карта сайта",
                        link: "/site-map"
                    },
                ]
        }
    }

}
</script>

<style lang="scss">
    .footer {
        margin-top: auto;
        &-form {
            max-width: 380px;
            width: 100%;
            &__checkbox {
                display: flex;
                font-size: 12px;
                align-items: center;
                &-input {
                    margin-right: 5px;
                }
            }
            &__group {
                display: flex;
                margin-bottom: 15px;
            }
            &__text {
                width: 70%;
                font-size: 12px;
                padding: 10px;
                border: 1px solid #c4c1c1;
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
                &:focus {
                    border-color: var(--bg-color);
                }
            }
            &__btn {
                width: 30%;
                font-size: 12px;
                background: var(--bg-color);
                color: #fff;
                cursor: pointer;
            }
        }
        &-wrap {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 30px 0;
        }
        &-logo {
            max-width: 100px;
            width: 100%;
        }
        &-bottom {
            display: flex;
            justify-content: space-between;
            padding: 15px 0;
            &__list {
                display: flex;
            }
            &__item {
                margin-right: 15px;
                &:last-child {
                    margin: 0;
                }
            }
            &__link {
                font-size: 14px;
                font-weight: 500;
                transition: color 0.3s ease-in-out;
                color: #000;
                &:hover {
                    color: var(--bg-color)
                }
            }
        }
    }
</style>