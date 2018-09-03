const puppeteer = require('puppeteer')
/* local */
const log = require('./src/lib/log')
const { check } = require('./src/lib/check')
const { mergeConfig } = require('./src/config')

async function main(urls, config) {
  mergeConfig(config)
  await boot()
  await check(urls)
  await teardown()
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
