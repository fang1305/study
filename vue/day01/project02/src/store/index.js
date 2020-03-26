import Vue from 'vue';
import Vuex from 'vuex';
// import user from './user'

Vue.use(Vuex);

const store = new Vuex.Store({
  // 全局状态
  state: {
    count: 0
  },
  modules: {
    
  },
  // 对数据进行包装处理
  getters: {
    myCount(state) {
      // return state.count + '=='
    
      return `this is a ${state.count}`
    }
  },
  // 修改全局状态
  mutations: {
    increment(state, n) {
      state.count += n;
    },
    descrement(state) {
      state.count -= 1;
    }
  },
  // 业务逻辑, 不涉及页面
  actions: {
    myIncrease(context) {
      context.commit('increment')
    },
    myDecrease(context) {
      context.commit('desrement')
    }
  }
})

export default store;