import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(Vuex)
const store = new Vuex.Store({
    // 全局状态
    state: {
        count: 0
    },
    // 对数据进行处理
    getters: {

    },
    // 修改全局状态
    mutations:{
        increment(state){
            state.count += 1;
        },
        descrement(state){
            state.count -= 1;
        }
    },
    // 业务逻辑, 不涉及页面
    actions: {

    }
})
Vue.prototype.$axios = axios;
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
