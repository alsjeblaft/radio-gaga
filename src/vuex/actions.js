export const playPause = function ({ dispatch, state }, station) {
  dispatch('PLAY_PAUSE', station.name)
}

export const dispatchError = function ({ dispatch, state }, source, code) {
  if (source) {
    dispatch('ERROR', source, code)
  } else {
    dispatch('RESET_ERROR')
  }
}
