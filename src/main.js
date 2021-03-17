import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'
import "material-design-icons-iconfont"
import Vuelidate from "vuelidate"

/* Firebase */
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"


/* Filters */
import FilterText from "@/filters/filter-text"
import FilterCurrency from "@/filters/currency.filter"
import dateFilter from "@/filters/date.filter"
Vue.filter("filterCurrency",FilterCurrency)
Vue.filter("filterText",FilterText)
Vue.filter("date",dateFilter)

Vue.use(Vuelidate);
Vue.use(VueMeta);

const firebaseConfig = {
  apiKey: "AIzaSyA11Daw4wSTG5blgTkp1v-zmJZ2MaE6rR8",
  authDomain: "creative-shop-36583.firebaseapp.com",
  databaseURL: "https://creative-shop-36583-default-rtdb.firebaseio.com",
  projectId: "creative-shop-36583",
  storageBucket: "creative-shop-36583.appspot.com",
  messagingSenderId: "768805139375",
  appId: "1:768805139375:web:bb819b7879ab98e9a3b55a"
};
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')