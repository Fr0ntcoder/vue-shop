<template>
    <aside class="aside">
        <form action="" class="aside-filter" @change="changeFormBrand">
            <div class="aside-filter__group" v-for="item of result" :key="item.id">
                <a href="#" class="aside-filter__link">{{item.title}} </a>
                <ul class="aside-filter__list" :class="{active: item.active}">
                    <li class="aside-filter__item" v-for="(it,index) of item.category" :key="index" >
                        <input type="checkbox" :value="it" :id="`aside-filter__manufacturer-${it}`" v-model="checkedBrand">
                        <label :for="`aside-filter__manufacturer-${it}`">{{it | firstUppercase}}</label>
                    </li>
                </ul>
            </div>  
        </form> 
    </aside>
</template>

<script>
import {mapActions,mapGetters} from "vuex"
export default {
    name: "Sidebar",
    data: () => ({
        filterMinValue: 0,
        filterMaxValue: 0,
        height: 0,
        checkedBrand: [],
        count: 0,
        mas: []
    }),
    computed: {
       ...mapGetters(["BRAND","FILTER_BRAND"]),
       result() {
           const mas = []
            this.FILTER_BRAND.forEach(el => {
                if(!mas.includes(el.brand)) {
                    return mas.push(el.brand);
                }
            })

            return [{
                title: "Производитель",
                active: false,
                category: mas
           }];
           
       }
    },
    methods: {
        ...mapActions(["ADD_FILTER_PRODUCTS","ADD_BRAND"]),
        changeFormBrand() {
            this.ADD_BRAND(this.checkedBrand)  
        },
    },
    filters: {
        firstUppercase(val) {
            return val.slice(0,1).toUpperCase() + val.slice(1);
        }
    },
    watch: {
    },
    mounted() {
    }
}
</script>

<style lang="scss">
    .aside {
        width: 25%;
        &-filter {
            &__price {
                &-block {
                    display: flex;
                    width: 45%;
                    font-size: 14px;
                    padding: 5px;
                    box-shadow: 0 0 2px 0 var(--bg-color);
                    & label {
                        margin-right: 10px;
                    }
                    & input {
                        width: 100%;
                        font-size: 14px;
                    }
                }
                &-wrap {
                    display: flex;
                    justify-content: space-between;
                    margin: 15px 0 30px;
                }
            }
            &__group {
                margin-bottom: 15px;
            }
            &__list {
                height: auto;
                transition: all 0.3s ease-in-out;
                overflow: hidden; 
                visibility: visible;
                opacity: 1;
                &.active {
                    opacity: 0; 
                    visibility: hidden; 
                }
            }
            &__item {
                display: flex;
                font-size: 16px;
                align-items: center;
                margin: 15px 0;
                & label {
                    display: block;
                    width: 100%;
                    cursor: pointer;
                }
                & input {
                    width: 15px;
                    height: 15px;
                    margin-right: 15px;
                }
            }
            &__link {
                position: relative;
                display: block;
                font-size: 16px;
                font-weight: 700;
                margin-bottom: 5px;
                color: #000;
                & svg {
                    position: absolute;
                    right: 10px;
                    top: 5%;
                    transition: all 0.3s ease-in-out;
                }
                &.active {
                    & svg {
                        transform: rotate(180deg);
                    }
                }
            }
        }
    }
.aside-filter__item input {
    display: none;
}
.aside-filter__item label {
    position: relative;
    padding-left: 30px;
}
.aside-filter__item label:after {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 20px;
    height: 20px;
    border: 1px solid var(--bg-color);
    border-radius: 2px;
    transform: translateY(-50%);
}
.aside-filter__item label:before {
     content: "";
    position: absolute;
    left: 4px;
    top: 50%;
    width: 14px;
    height: 14px;
    transition: all 0.2s ease-in-out;
    transform: translateY(-50%);
    border-radius: 2px;
    background: transparent;
    z-index: 1;  
}

.aside-filter__item input:checked + label:before {
    background: green;
}
</style>