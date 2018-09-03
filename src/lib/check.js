const Listr = require('listr')

const Shot = require('./shot')
const Page = require('./page')
const log = require('./log')
const { arrayArg } = require('./util')

// async function check(urls) {
//   urls = arrayArg(urls)
//   return Promise.all(urls.map(checkPage))
// }

async function check(urls) {
  urls = arrayArg(urls)
  const tasks = urls.map(url => {
    return {
      title: url,
      task() {
        return checkPage(url)
      }
    }
  })

  return new Listr(tasks, { concurrent: true, exitOnError: false }).run()
}

async function checkPage(url) {
  const page = new Page(url)
  const tasks = page.getTasks(verifier)
  return new Listr(tasks, { concurrent: true, exitOnError: false })
  // await page.runTasks(verifier)
}

async function verifier([url, viewport, suffix]) {
  const shot = new Shot(url, viewport, suffix)
  const match = await shot.check()
  // log('match', match, url, suffix)
}

module.exports = {
  check
}
