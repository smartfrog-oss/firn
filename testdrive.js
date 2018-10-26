// const firn = require('./')
const firn = require('./main.js')
const log = require('./src/lib/log')

// const urls = ['https://smartfrog.com/de-de/shop', 'https://smartfrog.com/de-de/shop/products']
const urls = ['https://smartfrog.com/de-de/shop']
const config = { screenshotExt: 'png' }
;(async () => {
  const [err, raport] = await firn(urls, config)
  if (err) log('😦 Oh No! ', err)
  log('📝  raport ', raport)
})()
