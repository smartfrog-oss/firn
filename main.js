const puppeteer = require('puppeteer')
/* local */
const viewports = require('./src/config/viewport')
const log = require('./src/lib/log')
const Shot = require('./src/lib/shot')

const urls = ['https://smartfrog.com/de-de/shop']

async function main() {
  await boot()
  await checkAll()
  await teardown()
}

async function checkAll() {
  const list = urlMap(urls)
  const promise = list.map(checkItem)
  return Promise.all(promise)
}

async function checkItem([url, viewport, suffix]) {
  const shot = new Shot(url, viewport, suffix)
  const match = await shot.check()
  log('match', match, url, suffix)
}

function viewportMap(url) {
  return Object.entries(viewports).map(([suffix, viewport]) => [url, viewport, suffix])
}

function urlMap(urls) {
  return urls.map(url => viewportMap(url)).reduce((acc, i) => [...acc, ...i], [])
}

async function boot() {
  log('🚀 manar')
  if (global.browser) return
  global.browser = await puppeteer.launch()
}

async function teardown() {
  log('👋 manar')
  global.browser.close()
}

main()
  .then(e => {
    log('👍 ALL GOOD')
  })
  .catch(e => {
    log('😦 Oh No! ', e)
    process.exit(1)
  })
