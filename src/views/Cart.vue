<template>
  	<div class="cart-content">
		<div class="cart-empty" v-if="!CART.length">
			<i class="material-icons">shopping_cart</i>
			<h3 class="cart-empty__title">Ваша корзина пуста</h3>
			<p class="cart-empty__text">Выберите нужный Вам товар из каталога интернет-магазина <br/> и добавьте его в корзину.</p>
		</div>
		<div class="cart-wrap" v-else>
			<ul class="cart-top__list">
				<li class="cart-top__item">#</li>
				<li class="cart-top__item">Товар</li>
				<li class="cart-top__item">Цена</li>
				<li class="cart-top__item">Количество</li>
				<li class="cart-top__item">Сумма</li>
				<li class="cart-top__item">Удалить</li>
			</ul>
			<ul class="cart-list" v-for="(item,i) of CART" :key="item.id">
				<li class="cart-item">{{i + 1}}</li>	
				<li class="cart-item cart-item--product">
					<span :class="`cart-item__img cart-item__img-${item.category}`">
						<img :src="item.img" alt="">
					</span>	
					<div class="cart-item__content">
						<h3 class="cart-item__title">{{item.title}}</h3>
					</div>
				</li>	 
				<li class="cart-item cart-item--sum">{{item.price | filterCurrency}}</li> 
				<li class="cart-item cart-item--btn">
					<button class="cart-item__btn" @click.prevent="cartSub(item.counter,item.id)"><span>-</span></button>
					<span class="cart-item__counter">{{item.counter}}</span>
					<button class="cart-item__btn" @click.prevent="cartAdd(item.id)"><span>+</span></button>
				</li> 
				<li class="cart-item cart-item--sum">{{item.counter * item.price | filterCurrency}}</li> 
				<li class="cart-item"><button class="cart-item__remove" @click.prevent="cartRemove(i)"><i class="material-icons">delete</i></button></li> 
			</ul> 
			<div class="cart-empty__bottom">
				<div class="cart-empty__bottom-block">
					<h4 class="cart-empty__bottom-title">Итого</h4>
					<p class="cart-empty__bottom-text">Количество товаров: <span class="cart-empty__bottom-inner">{{cartCounterProducts}}</span></p>
					<p class="cart-empty__bottom-text">Товаров на: <span class="cart-empty__bottom-inner">{{cartSumProducts | filterCurrency}}</span></p>
					<div class="cart-empty__bottom-result">Всего к оплате: <span class="">{{cartSumProducts | filterCurrency}}</span></div>
					<div class="cart-empty__bottom-wrap">
						<button class="cart-empty__bottom-btn" @click.prevent="showModalCart">Оформить заказ</button>
					</div>
				</div>
			</div>
		</div>
  	</div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"
export default {
	metaInfo() {
        return {
            title: `vue-shop | Корзина с товарами`

        }
    },
    name: "cart",
    data: () => ({
    }),
    computed: {
      ...mapGetters(["CART"]),
	  	cartCounterProducts() {
			return this.CART.reduce((sum,el) => {
				return sum + el.counter;
			},0)
		},
		cartSumProducts() {
			 return this.CART.reduce((total,el) => {
                    return total + (el.price * el.counter);
            },0)
		}
    },
	methods: {
		...mapActions(["CART_INCREMENT","CART_DECREMENT","CART_REMOVE"]),
		...mapActions(["SHOW_MODAL_CART","HIDE_MODAL_CART"]),
		cartAdd(id) {
			this.CART_INCREMENT(id)
		},
		cartSub(count,id) {
			if(count > 1) {
				this.CART_DECREMENT(id)
			}
		},
		cartRemove(i) {
			this.CART_REMOVE(i)
		},
		showModalCart() {
			document.querySelector("body").classList.add("hide") 
			this.SHOW_MODAL_CART()
		},

	},
    mounted() {
		this.HIDE_MODAL_CART()
    }
}
</script>

<style lang="scss">
	.cart {
		&-empty {
			&__bottom {
				display: flex;
				justify-content: flex-end;
				margin-top: 50px;
				&-wrap {
					display: flex;
					justify-content: flex-end;
				}
				&-btn {
					font-size: 16px;
					padding: 10px 30px;
					margin-top: 30px;
					border: none;
					border-radius: 5px;
					background: var(--bg-color);
					cursor: pointer;
					color: #fff;
				}
				&-result {
					display: flex;
					font-size: 18px;
					justify-content: space-between;
					& span {
						font-weight: 700;
					}
				}
				&-block {
					max-width: 300px;
					width: 100%;
					padding: 15px;
					border: 1px solid #dfdcdc;
				}
				&-inner {
					font-weight: 700;
				}
				&-title {
					font-size: 22px;
					padding-bottom: 15px;
					margin-bottom: 15px;
					border-bottom: 1px solid #c0bcbc;
				}
				&-text {
					display: flex;
					font-size: 16px;
					margin-bottom: 10px;
					justify-content: space-between;
				}
			}
			display: flex;
			height: 100%;
			padding: 15px;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			& i {
				font-size: 120px;
			}
			&__title {
				font-size: 20px;
				margin: 15px 0;
			}
			&__text {
				text-align: center;
				margin-bottom: 30px;
			}
			&__link {
				display: block;
				font-size: 16px;
				font-weight: 700;
				padding: 10px 30px;
				border-radius: 5px;
				background: var(--bg-color);
				color: #fff;
			} 
		}
		&-top {
			&__list {
				display: flex;
				justify-content: space-between;
				margin-bottom: 15px;
				border-bottom: 1px solid #8d8989;
			}
			&__item {
				font-size: 16px;
				text-align: center;
				padding: 5px 5px 15px;
				
				&:nth-child(1) {
					width: 5%;
				}
				&:nth-child(2) {
					width: 45%;
				}
				&:nth-child(3) {
					width: 10%;
				}
				&:nth-child(4) {
					width: 20%;
				}
				&:nth-child(5) {
					width: 10%;
				}
				&:nth-child(6) {
					width: 10%;
				}
			}
		}
		&-list {
			display: flex;
			align-items: center;
			border-bottom: 1px solid #ddd9d9;
			margin-bottom: 15px;
			&:last-child {
				margin-bottom: 0;
			}
		}
		&-item {
			font-size: 16px;
			text-align: center;
			padding: 5px 5px 15px;
			&__remove {
				background: transparent;
				border:none;
				cursor: pointer;
			}
			&--btn {
				display: flex;
				justify-content: center;
			}
			&--sum {
				font-weight: 700;
			}
			&__btn {
				position: relative;
				width: 30px;
				height: 30px;
				font-size: 20px;
				box-shadow: 0 0 1px 0 rgba(51, 51, 51,.9);
				border: none;
				background: transparent;
				cursor: pointer;
				& span {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%,-50%);
				}
				&:nth-child(1) {
					& span {
						top: 42%;
					}
				}
			}
			&__counter {
				display: flex;
				width: 40px;
				height: 30px;
				box-shadow: 0 0 1px 0 rgba(51, 51, 51,.9);
				align-items: center;
				justify-content: center;
			}
			&__img {
				display: block;
				&-phone {
					width: 25%;
				}
				&-tv{
					width: 50%;
				}
				&-notebook {
					width: 50%;
				}
				&-monitor {
					width: 50%;
				}
				&-washer {
					width: 30%;
				}
				&-fridge {
					width: 30%;
				}
				&-headphones {
					width: 30%;
				}
			}
			&__content {
				width: 100%;
				padding-left: 50px;
			}
			&--product {
					display: flex;
					align-items: center;
				}			
				&:nth-child(1) {
					width: 5%;
				}
				&:nth-child(2) {
					width: 45%;
				}
				&:nth-child(3) {
					width: 10%;
				}
				&:nth-child(4) {
					width: 20%;
				}
				&:nth-child(5) {
					width: 10%;
				}
				&:nth-child(6) {
					width: 10%;
				}
		}
	}
</style>