// const firn = require('./')
const firn = require('./')
const log = require('./src/lib/log')

const urls = ['https://smartfrog.com/de-de/shop']
const config = {}

firn(urls[0], config)
  .then(e => {
    log('👍 ALL GOOD')
  })
  .catch(e => {
    log('😦 Oh No! ', e)
    process.exit(1)
  })
