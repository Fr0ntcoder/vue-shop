export default {
    state: {
        modalMessage: {
            title: "",
            text: "",
            active: false
        },
        modalCart: false,
        modalReviews: false,
        modalRegistration: false
    },
    mutations: {
        SET_MODAL_MESSAGE_SHOW(state,arr) {
            state.modalMessage = arr
        },
        SET_MODAL_MESSAGE_HIDE(state,arr) {
            state.modalMessage = {
                title: "",
                text: "",
                active: false    
            }
        },
        SET_MODAL_CART_SHOW(state) {
            state.modalCart = true
        },
        SET_MODAL_CART_HIDE(state) {
            state.modalCart = false
        },
        SET_MODAL_REVIEWS_SHOW(state) {
            state.modalReviews = true
        },
        SET_MODAL_REVIEWS_HIDE(state) {
            state.modalReviews = false
        },
        SET_MODAL_REGISTRATION_SHOW(state) {
            state.modalRegistration = true
        },
        SET_MODAL_REGISTRATION_HIDE(state) {
            state.modalRegistration = false
        }
    },
    actions: {
        SHOW_MODAL_REVIEWS({commit}) {
            commit("SET_MODAL_REVIEWS_SHOW")
        },
        HIDE_MODAL_REVIEWS({commit}) {
            commit("SET_MODAL_REVIEWS_HIDE")
        },
        SHOW_MODAL_MESSAGE({commit},arr) {
            commit("SET_MODAL_MESSAGE_SHOW",arr)
        },
        HIDE_MODAL_MESSAGE({commit},arr) {
            commit("SET_MODAL_MESSAGE_HIDE",arr)
        },
        SHOW_MODAL_CART({commit}) {
            commit("SET_MODAL_CART_SHOW")
        },
        HIDE_MODAL_CART({commit}) {
            commit("SET_MODAL_CART_HIDE")
        },
        SHOW_MODAL_REGISTRATION({commit}) {
            commit("SET_MODAL_REGISTRATION_SHOW")
        },
        HIDE_MODAL_REGISTRATION({commit}) {
            commit("SET_MODAL_REGISTRATION_HIDE")
        }
    },
    getters: {
        MODAL_MESSAGE: state => state.modalMessage,
        MODAL_CART: state => state.modalCart,
        MODAL_REVIEWS: state => state.modalReviews,
        MODAL_REGISTRATION: state => state.modalRegistration
    }
}