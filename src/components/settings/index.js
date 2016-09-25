import Vue from 'vue'
import './style.less'
import template from './template.html'
import { updateStationsDataUrl, downloadStations, resetStations } from '../../vuex/actions'

export default Vue.component('Settings', {
  template,
  data: () => ({
    showSettings: false
  }),
  vuex: {
    getters: {
      stations: state => state.stations,
      stationsDataUrl: state => state.stationsDataUrl,
      usingBuiltinStations: state => state.usingBuiltinStations,
      downloadingStations: state => state.downloadingStations
    },
    actions: {
      updateStationsDataUrl,
      downloadStations,
      resetStations
    }
  }
})
