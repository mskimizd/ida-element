
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    comps: [],
    //collapse
    gadgetShow:false,
    tableShow:false,
  },
  mutations: {
  	setx(state,comps){
      state.comps = comps;
    },
    collapseGadget(state,gadgetShow){
      state.gadgetShow = gadgetShow;
    },
    collapseTable(state,tableShow){
      state.tableShow = tableShow;
    }    
  }
})

export default store;