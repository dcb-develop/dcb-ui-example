// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Navigation from 'vue-navigation'
import { ajax } from '@/common'
import 'lib-flexible'
import '@/assets/font/iconfont.css'
import toast from '@/components/toast'
import dialog from '@/components/dialog'
import load from '@/components/loading'

Vue.use(Navigation, {router, keyName: 'vnk'})
  .use(dialog)
  .use(toast)
  .use(load);

Vue.prototype.$http = ajax
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
