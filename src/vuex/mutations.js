import Vue from 'vue'
import ls from '../utils/localStorage'
import { initStations } from './initializers'

export default {
  PLAY_PAUSE (state, stationName) {
    state.stations.filter(st => st.name !== stationName).forEach(st => Vue.set(st, 'playing', false))
    const station = state.stations.find(st => st.name === stationName)
    const playing = !station.playing
    Vue.set(station, 'playing', playing)
    state.currentStation = playing ? station : null
  },

  STOP (state) {
    state.stations.forEach(st => Vue.set(st, 'playing', false))
    state.currentStation = null
  },

  ERROR (state, source, code) {
    state.error = { source, code }
  },

  RESET_ERROR (state) {
    state.error = null
  },

  UPDATE_STATIONS_DATA_URL (state, url) {
    ls.setItem('stationsDataUrl', url)
    state.stationsDataUrl = url
  },

  UPDATE_STATIONS (state, stations) {
    if (stations) {
      ls.setItem('stations', stations)
    } else {
      ls.removeItem('stations')
    }
    state.stations = initStations()
    state.usingBuiltinStations = !stations
  },

  DOWNLOADING_STATIONS (state, operationState) {
    state.downloadingStations = operationState
  }
}
