// const firn = require('./')
const firn = require('./')
const log = require('./src/lib/log')

const urls = ['https://smartfrog.com/de-de/shop', 'https://smartfrog.com/de-de/shop/products']
const config = { screenshotExt: 'jpg' }

firn(urls, config)
  .then(e => {
    log('👍 ALL GOOD')
  })
  .catch(e => {
    log('😦 Oh No! ', e)
    process.exit(1)
  })
