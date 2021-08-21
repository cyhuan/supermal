import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FasrClick from 'fastclick'
import VuelazyLoad from 'vue-lazyload'
import toast from 'components/common/toast'

Vue.config.productionTip = false

FasrClick.attach(document.body)

Vue.prototype.$bus = new Vue()
Vue.use(toast)
Vue.use(VuelazyLoad, {
  loading: require('assets/img/common/placeholder.png')
})
new Vue({
  render: h => h(App),
  router, store
}).$mount('#app')
