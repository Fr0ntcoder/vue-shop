<template>
  <div id="app">
    <modal-cart />
    <modal-message />
    <modal-add-reviews v-if="MODAL_REVIEWS"/>
    <modal-registration v-if="MODAL_REGISTRATION"/>
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>
<script>
import Empty from "@/layouts/Empty"
import Main from "@/layouts/Main"
import modalMessage from "@/components/modal/Modal-message"
import modalCart from "@/components/modal/Modal-cart"
import modalAddReviews from "@/components/modal/Modal-add-reviews"
import modalRegistration from "@/components/modal/Modal-registration"
import {mapGetters,mapActions} from "vuex"
export default {
  components: {
    Empty,Main,modalMessage,modalCart,modalAddReviews,modalRegistration
  },
  computed: {
    ...mapGetters(["MODAL_REVIEWS","MODAL_REGISTRATION"]),
    layout() {
      return this.$route.meta.layout
    }
  },
  methods: {
    ...mapActions(["HIDE_MODAL_REVIEWS","HIDE_MODAL_REGISTRATION"])
  },
  mounted() {
    this.HIDE_MODAL_REVIEWS()
    this.HIDE_MODAL_REGISTRATION()
  }
}
</script>
<style>
@import "assets/css/reset.css";
@import "assets/css/constants.css";
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,100&display=swap');
body,html {
  position: relative;
  font-family: "Roboto",sans-serif;
  min-height: 100%;
  height: 100%;
}
body.hide {
  overflow-y: hidden;
}
#app {
  position: relative;
  height: 100%;
}
.wrapper {
  display: flex;
  max-width: 1900px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  flex-direction: column;
}
.container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
  /* outline: 1px solid #000; */
}
.inner-content {
  position: relative;
  height: 100%;
}
</style>
