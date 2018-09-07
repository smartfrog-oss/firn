const Listr = require('listr')
const promx = require('promx')

const Shot = require('./shot')
const Page = require('./page')
const log = require('./log')
const { arrayArg } = require('./util')

const Taskr = require('./taskr')

const listrOption = { concurrent: true, exitOnError: false, renderer: 'default' }
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

  return new Listr(tasks, listrOption).run()
}

async function checkPage(url) {
  const page = new Page(url)
  const tasks = page.getTasks(verifier)
  return new Listr(tasks, listrOption)
  // await page.runTasks(verifier)
}

async function verifier([url, viewport, suffix]) {
  const shot = new Shot(url, viewport, suffix)
  const match = await shot.check()
  // console.log('verifier', match)

  return match
}

module.exports = {
  check
}
