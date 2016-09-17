import Vue from 'vue'
import template from './template.html'
import './style.less'
import { playPause } from '../../vuex/actions'

export default Vue.component('StationList', {
  template,
  vuex: {
    getters: {
      stations: state => state.stations
    },
    actions: {
      playPause
    }
  },
  methods: {
    onStationClick (station) {
      this.playPause(station)
    }
  }
})
