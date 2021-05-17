import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		sensor_warn_count: "",
		task_count: "",
		repater_warn_count: ""
	},
	mutations:{
		warn_count(state,warn_count){
			state.sensor_warn_count = warn_count
		},
		task_count(state,task_count){
			state.task_count = task_count
		},
		repater_warn_count(state,repater_warn_count){
			state.repater_warn_count = repater_warn_count
		}
	}
})
export default store