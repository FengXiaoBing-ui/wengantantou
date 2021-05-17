import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import tabBar from 'conponents/tabbar.vue'
import headerTab from 'conponents/header-tab.vue'
import api from 'api/api.js'

Vue.config.productionTip = false
Vue.component('tab-bar',tabBar)
Vue.component('headerTab',headerTab)
Vue.prototype.$api = api
Vue.prototype.$store = store

uni.getSystemInfo({
	success(e) {
		Vue.prototype.appheight = e.windowHeight
	}
})

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
