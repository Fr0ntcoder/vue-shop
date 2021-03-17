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


/* Font awesome */
/* Filters */
import FilterText from "@/filters/filter-text"
import FilterCurrency from "@/filters/currency.filter"
import dateFilter from "@/filters/date.filter"
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMapMarkerAlt,faUser,faShoppingCart,faSearch,faTv,faMobileAlt,faLaptop,faDesktop,faArchive,faPrescriptionBottle,faHeadphones,faCaretUp,faStar as fasStar,faChevronRight,faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faMapMarkerAlt,faUser,faShoppingCart,faSearch,faTv,faMobileAlt,faLaptop,faDesktop,faArchive,faPrescriptionBottle,faHeadphones,faCaretUp,fasStar,faChevronRight,faChevronLeft,farStar)
Vue.filter("filterCurrency",FilterCurrency)
Vue.filter("filterText",FilterText)
Vue.filter("date",dateFilter)
Vue.component('font-awesome-icon', FontAwesomeIcon)
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