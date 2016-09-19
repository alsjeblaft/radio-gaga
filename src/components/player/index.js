import Vue from 'vue'
import oget from 'object-get'
import template from './template.html'
import './style.less'
import { dispatchError } from '../../vuex/actions'

export default Vue.component('Player', {
  template,
  vuex: {
    getters: {
      currentStation: state => state.currentStation
    },
    actions: {
      dispatchError
    }
  },
  data: () => ({
    playing: ''
  }),
  computed: {
    src () {
      return this.currentStation ? 'http://localhost:3000/a.mp3' : '' // TODO error handling
      return (this.currentStation || {}).src
    }
  },
  watch: {
    src (src) {
      Vue.nextTick(() => this.playPause(src))
    }
  },
  mounted () {
    this.$refs.player.addEventListener('error', this.onError, true)
  },
  destroyed () {
    this.$refs.player.removeEventListener('error', this.onError)
  },
  methods: {
    playPause (hasSource) {
      const player = this.$refs.player
      if (hasSource) {
        player.play()
      } else {
        player.pause()
        player.currentTime = 0
      }
    },
    onError (err) {
      const code = oget(err, 'target.error.code')
      if (!code) {
        return
      }
      // see: https://developer.mozilla.org/en-US/docs/Web/API/MediaError
      this.dispatchError('player', code)
    }
  }
})
