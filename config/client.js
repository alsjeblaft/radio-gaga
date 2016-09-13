require('dotenv').config()

const config = {
  devPort: process.env.DEV_PORT || 3000
}

module.exports = config
