import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		count: {},
		people: {},
		parmes: {},
		pagoda: {},
		repeater: {},
		activerepeater: {
			postion: {},
			server: {}
		},
		probeid: "",
		repeaterid: "",
		electric: 20,
		temperatureyellow: 30,
		temperaturered: 50
	},
	mutations:{
		count(state,count){
			state.count = count
		},
		people(state,people){
			state.people = people
		},
		parmes(state,parmes){
			state.parmes = parmes
		},
		pagoda(state,obj){
			state.pagoda = obj
		},
		repeater(state,obj){
			state.repeater = obj
		},
		probeid(state,id){
			state.probeid = id
		},
		repeaterid(state,id){
			state.repeaterid = id
		},
		activerepeater(state,obj){
			if(obj.type==0){
				state.activerepeater.postion = obj
			}else{
				state.activerepeater.server = obj
			}
		}
	}
})
export default store