import './styles/index.less'
import Vue from 'vue'
import App from './components/app'
import store from './vuex/store'

// TODO vue i18n <- window.navigator.userLanguage || window.navigator.language (hu-HU)

function init () {
  return new Vue({
    el: '#main',
    store,
    components: {
      App
    }
  })
}

document.addEventListener(window.cordova ? 'deviceready' : 'DOMContentLoaded', init, false)
