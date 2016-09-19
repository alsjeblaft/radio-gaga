import Vue from 'vue'
import template from './template.html'
import './style.less'
import { dispatchError } from '../../vuex/actions'

export default Vue.component('ErrorMessage', {
  template,
  vuex: {
    getters: {
      error: state => state.error
    },
    actions: {
      dispatchError
    }
  },
  computed: {
    message () {
      if (!this.error) {
        return
      }
      let key = 'unknownError'
      let code = this.error.code
      if (this.error.source === 'player') {
        code = code > 0 && code < 5 ? code : 0
        key = `mediaError${code}`
      } else if (this.error.source === 'player') {
        key = 'fetchError'
      }
      return Vue.t(key)
    }
  },
  methods: {
    close () {
      this.dispatchError(false)
    }
  }
})
