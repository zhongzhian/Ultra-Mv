// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import store from './store'
// import 'iview/dist/styles/iview.css'
import './styles/dark/index.less'
import VueI18n from 'vue-i18n'
import messages from './locale'
import axios from 'axios'
import VueAxios from 'vue-axios'
import BTable from './components/table/BTable.vue'

Vue.config.productionTip = false
Vue.use(iView)
Vue.use(VueI18n)
Vue.use(VueAxios, axios)
Vue.component('BTable', BTable)

const i18n = new VueI18n({
  locale: 'zh-CN',
  messages
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  store,
  router,
  render: h => h(App),
})
