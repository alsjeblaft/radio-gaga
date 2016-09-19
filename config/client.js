require('dotenv').config()

const config = {
  devPort: process.env.DEV_PORT || 3000,
  defaultStationDataUrl: process.env.DEFAULT_STATION_DATA_URL || 'https://rawgit.com/szkrd/radio-gaga/master/config/stations.json'
}

module.exports = config
