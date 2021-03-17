import firebase from "firebase/app"

export default {
    state: {
        cart: []
    },
    mutations: {
        SET_CART(state,payload) {
            state.cart.push(payload)
        },
        INCREMENT(state,id) {
            state.cart = state.cart.map(el => {
                if(el.id === id) {
                    return {
                        ...el,
                        counter: el.counter + 1 
                    }
                }else {
                    return {
                        ...el
                    }
                }
            })
        },
        DECREMENT(state,id) {
            state.cart = state.cart.map(el => {
                if(el.id === id) {
                    return {
                        ...el,
                        counter: el.counter - 1 
                    }
                }else {
                    return {
                        ...el
                    }
                }
            })
        },
        REMOVE(state,i) {
            state.cart.splice(i,1)
        }
    },
    actions: {
        ADD_CART({commit},id) {
            commit("SET_CART",id)
        },
        CART_INCREMENT({commit},id) {
            commit("INCREMENT",id)
        },
        CART_DECREMENT({commit},id) {
            commit("DECREMENT",id)
        },
        CART_REMOVE({commit},i) {
            commit("REMOVE",i)
        },
        async CART_SEND({commit},cart) {
            try {
                return await firebase.database().ref("/cart").push(cart)
            }catch(e) {
                throw e;
            }
        }
    },
    getters: {
        CART: state => state.cart
    }
}