import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import api from './api/combineMethods'

Vue.config.productionTip = false
Vue.prototype.$api = api

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
