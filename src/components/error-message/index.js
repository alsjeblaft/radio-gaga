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
      return 'TODO an error occured' + JSON.stringify(this.error)
    }
  },
  methods: {
    close () {
      this.dispatchError(false)
    }
  }
})
