import Vue from 'vue'
import Vuex from 'vuex'
import Products from "./products"
import Cart from "./cart"
import Modal from "./modal"
import Auth from "./auth"
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Products,Cart,Modal,Auth
  },
  plugins: [createPersistedState()],
})
