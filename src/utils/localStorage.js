import eventBus from './eventBus'

function wrapper (method, key, value) {
  let result
  try {
    if (method === 'getItem') {
      result = JSON.parse(localStorage.getItem(key))
    } else if (method === 'setItem') {
      localStorage.setItem(key, JSON.stringify(value))
      result = value
    } else {
      localStorage.removeItem(key)
    }
  } catch (err) {
    // vuex store hasn't been created yet
    eventBus.emit('errorEvent', 'localStorage', 0)
    console.error('LocalStorage not available.', err)
  }
  return result
}

export function getItem (key) {
  return wrapper('getItem', key)
}

export function setItem (key, value) {
  return wrapper('setItem', key, value)
}

export function removeItem (key) {
  return wrapper('removeItem', key)
}

export default { getItem, setItem, removeItem }
