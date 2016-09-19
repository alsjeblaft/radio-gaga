import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import { initStations, initStationsDataUrl, initUsingBuiltinStations } from './initializers'

Vue.use(Vuex)

const state = {
  error: null,
  currentStation: null,
  stations: initStations(),
  stationsDataUrl: initStationsDataUrl(),
  usingBuiltinStations: initUsingBuiltinStations(),
  downloadingStations: false
}

export default new Vuex.Store({
  state,
  mutations
})
