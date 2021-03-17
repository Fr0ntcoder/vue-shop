import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      layout: "Main"
    },
    component: () => import("@/views/Home.vue")
  },
  {
    path: '/product-single/:category/:id',
    name: 'product-single',
    meta: {
      layout: "Main"
    },
    props: true,
    component: () => import("@/views/Product-single.vue")
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      layout: "Empty"
    },
    component: () => import("@/views/About.vue")
  },
  {
    path: '/cart',
    name: 'cart',
    meta: {
      layout: "Main"
    },
    component: () => import("@/views/Cart.vue")
  },
  {
    path: '/:category',
    name: 'category',
    meta: {
      layout: "Empty"
    },
    props: true,
    component: () => import("@/views/Category.vue")
  },
  {
    path: '/:category/:brand',
    name: 'brand',
    meta: {
      layout: "Main"
    },
    props: true,
    component: () => import("@/views/Brand.vue")
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
