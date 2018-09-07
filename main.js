const puppeteer = require('puppeteer')
const promx = require('promx')
/* local */
const { mergeConfig } = require('./src/config')

const log = require('./src/lib/log')
const { check } = require('./src/lib/check')
const raport = require('./src/lib/raport')

async function main(urls, config) {
  global.config = mergeConfig(config)
  await boot()
  const [err] = await promx(check(urls))
  await teardown()
  return [err, raport.get()]
}

async function boot() {
  log('🚀 firn')
  if (global.browser) return
  global.browser = await puppeteer.launch()
}

async function teardown() {
  log('👋 firn')
  global.browser.close()
}

module.exports = main
