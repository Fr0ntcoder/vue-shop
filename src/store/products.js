import firebase from "firebase/app"
export default {
    state: {
        products: [],
        filterBrand: [],
        productsFilter: [],
        brand: [],
    },
    mutations: {
        SET_PRODUCTS(state,products) {
            state.products = products;
        },
        SET_PRODUCTS_FILTER(state,arr) {
            state.productsFilter = arr;
        },
        SET_FILTER_BRAND(state,arr) {
            state.filterBrand = arr
        },
        SET_BRAND(state,arr) {
            state.brand = arr
        }
    },
    actions: {
        async GET_PRODUCTS({dispatch,commit}) {
            try {
                const products = (await firebase.database().ref(`/products`).once("value")).val()
                commit("SET_PRODUCTS",products)
            }catch(e) {
                console.log(e)
            }
        },
        ADD_FILTER_PRODUCTS({commit},arr) {
            commit("SET_PRODUCTS_FILTER",arr)
        },
        ADD_FILTER_BRAND({commit},arr) {
            commit("SET_FILTER_BRAND",arr)
        },
        ADD_BRAND({commit},arr) {
            commit("SET_BRAND",arr)
        },
        async ADD_REVIEWS({commit},{id,name,city,email,date,text,rating}) {
            try {
                await firebase.database().ref("/products").child(id - 1).child("reviews").push({name,city,email,date,text,rating}).key
            }catch(e) {
                console.log(e)
            }
        }
    },
    getters: {
        PRODUCTS: state => state.products,
        PRODUCTS_ID: state => id => {
            return state.products.find(el => {
                return el.id === id;
            })
        },
        PRODUCTS_CAT: state => cat => {
            return state.products.filter(el => {
                return el.category === cat;
            })
        },
        PRODUCTS_CATEGORY_TEXT: cat => {
            switch(cat) {
                case "tv":
                "Телевизор"
                break;
            }
        },
        FILTER_BRAND: state => state.filterBrand,
        BRAND: state => state.brand,
        PRODUCTS_CATEGORY: state => arr => {
            return state.productsFilter.filter(el => {
                if(arr.includes(el.brand)) {
                    return el;
                }
            })
        },
        PRODUCTS_FILTER: state => state.productsFilter
    }
}