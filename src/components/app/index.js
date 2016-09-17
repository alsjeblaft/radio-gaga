import Vue from 'vue'
import template from './template.html'
import StationList from '../station-list'
import Settings from '../settings'
import Player from '../player'
import ErrorMessage from '../error-message'

export default Vue.component('App', {
  template,
  data: () => ({
    showSettings: false
  }),
  components: {
    StationList,
    Settings,
    Player,
    ErrorMessage
  }
})
