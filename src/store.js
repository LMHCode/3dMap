import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    TOKEN: ''
  },
  // commit
  mutations: {
    increment (state) {
      state.count++
    }
  },
  // dispatch
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})

export default store