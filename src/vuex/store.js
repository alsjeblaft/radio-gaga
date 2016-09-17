/* global STATIONS */
import Vue from 'vue'
import Vuex from 'vuex'

// Make vue aware of Vuex
Vue.use(Vuex)

function getStations () {
  let stations = STATIONS
  stations = stations.sort((a, b) => a.name.localeCompare(b.name))
  return stations
}

// Create an object to hold the initial state when
// the app starts up
const state = {
  error: null,
  currentStation: null,
  stations: getStations()
}

// Create an object storing various mutations. We will write the mutation
const mutations = {
  PLAY_PAUSE (state, stationName) {
    state.stations.filter(st => st.name !== stationName).forEach(st => Vue.set(st, 'playing', false))
    const station = state.stations.find(st => st.name === stationName)
    const playing = !station.playing
    Vue.set(station, 'playing', playing)
    state.currentStation = playing ? station : null
  },
  ERROR (state, source, code) {
    state.error = { source, code }
  },
  RESET_ERROR (state) {
    state.error = null
  }
}

export default new Vuex.Store({
  state,
  mutations
})
