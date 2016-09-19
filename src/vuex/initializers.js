/* global STATIONS, DEFAULT_STATION_DATA_URL */
import ls from '../utils/localStorage'

export function initStations (stations) {
  stations = stations || ls.getItem('stations') || STATIONS
  stations = stations.sort((a, b) => a.name.localeCompare(b.name))
  return stations
}

export function initStationsDataUrl () {
  return ls.getItem('stationsDataUrl') || DEFAULT_STATION_DATA_URL
}

export function initUsingBuiltinStations () {
  return !ls.getItem('stations')
}
