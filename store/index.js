import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		count: {},
	},
	mutations:{
		count(state,count){
			state.count = count
		},
	}
})
export default store