/* global cat */
require('shelljs/global')
const path = require('path')
const fetch = require('node-fetch')

let inputFileName = path.resolve(__dirname, '../config/stations.json')
let stations = cat(inputFileName) + ''
stations = JSON.parse(stations)
let stationCount = Object.keys(stations).length
let results = new Array(stationCount)

function escapeRex (s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

// fetch error handler
function handleError (err, i) {
  console.error(`Whoops! Item #${i} "${stations[i].name}" is broken. (${err.message})`)
  results[i] = null
}

// when all the stations are processed
function onDone () {
  console.log('Done.')
  let noBroken = results.every(item => typeof item === 'string')
  let allMatching = results.map((item, i) => item === stations[i].src).every(item => item)
  if (noBroken && allMatching) {
    console.log('Nothing to do, everything is fine.')
    return
  }

  results.forEach((item, i) => {
    let isBroken = stations[i].src !== item
    if (!isBroken) {
      return // continue
    }
    if (item === null) {
      stations[i].timestamp = Date.now()
      stations[i].broken = true
      return
    }
    stations[i].src = item
    stations[i].timestamp = Date.now()
  })

  console.log('I have modified the stationlist for you, please review it with a git diff.')
  console.log('Have a nice day.')
  JSON.stringify(stations, null, '  ').to(inputFileName)
}

// are we finished yet?
function mayExit () {
  let doneCount = results.filter(item => typeof item !== 'undefined').length
  console.log(`Working. ${doneCount} (${(doneCount / stationCount * 100).toFixed(2)}%)`)
  if (doneCount === stationCount) {
    onDone()
  }
}

// try to find an urlish pattern in a string
function findUrl (s, part) {
  part = escapeRex(part)
  // with attribute name + http + quotes
  let match = s.match(new RegExp(`src=('|")(http:\/\/.*?${part})\\1`))
  if (match && match[2]) {
    return match[2]
  }
  // with http + quotes
  match = s.match(new RegExp(`('|")(http:\/\/.*?${part})\\1`))
  if (match && match[2]) {
    return match[2]
  }
  // with quotes only
  match = s.match(new RegExp(`('|")(.*?${part})\\1`))
  if (match && match[2]) {
    return match[2]
  }
  return false
}

// add url to results array
function storeResult (n, url, suffix) {
  if (typeof url === 'string' && suffix && !url.endsWith(suffix)) {
    if (/\/$/.test(url)) {
      url += suffix
    } else {
      url += `/${suffix}`
    }
  }
  results[n] = url
  mayExit()
}

// process first download
function onMainPage (body, part, suffix, n) {
  let url = findUrl(body, part)
  if (/m3u|pls$/.test(part) && url) {
    fetch(url)
      .then(res => res.text())
      .then(body => storeResult(n, onPlaylist(body), suffix))
      .catch(err => handleError(err, n))
    return
  }
  storeResult(n, url, suffix)
}

// process second download (which is some kind of a playlist file)
function onPlaylist (body) {
  let match = body.match(/(http:\/\/.*?)[\r\n]/)
  if (match && match[1]) {
    return match[1]
  }
  match = body.match(/(http:\/\/.*?)$/) // how wonderful
  return match && match[1] ? match[1] : false
}

// process list of station
function init () {
  for (let i = 0, l = stations.length; i < l; i++) {
    let station = stations[i]
    let url = station.url
    let suffix = station.shoutcastify ? ';' : ''
    let strategy = station.locator.split('->')
    let part = strategy[0]

    if (strategy.length > 1) {
      url = strategy.shift()
      if (!url.startsWith('http')) {
        throw new Error(`Invalid url: ${url}`)
      }
      part = strategy[0]
    }

    fetch(url)
      .then(res => res.text())
      .then(body => onMainPage(body, part, suffix, i))
      .catch(err => handleError(err, i))
  }
}

init()
