import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueResource)

Vue.prototype.$axios = axios;
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
})
