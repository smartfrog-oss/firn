const Shot = require('./shot')
const Page = require('./page')
const log = require('./log')
const { arrayArg } = require('./util')

async function check(urls) {
  urls = arrayArg(urls)
  return Promise.all(urls.map(checkPage))
}

async function checkPage(url) {
  const page = new Page(url)
  await page.runTasks(tada)
}

async function tada([url, viewport, suffix]) {
  const shot = new Shot(url, viewport, suffix)
  const match = await shot.check()
  log('match', match, url, suffix)
}

module.exports = {
  check
}
