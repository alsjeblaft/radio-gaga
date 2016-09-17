import Vue from 'vue'
import template from './template.html'

export default Vue.component('Settings', {
  template,
  data: () => ({
    internal: true,
    downloading: false
  })
})
