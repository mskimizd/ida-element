
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    comps: [],
  },
  mutations: {
  	setx(state,comps){
      state.comps = comps;
    }
  }
})

export default store;