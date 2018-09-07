const Listr = require('listr')

const config = require('../config').getConfig()
const viewports = config.viewports

class Page {
  constructor(url) {
    this.url = url
    // this.label = label
    // this.viewport = viewport
    this.set = Page.sort(url, viewports)
  }

  static sort(url, viewports) {
    return Object.entries(viewports).map(([suffix, viewport]) => [url, viewport, suffix])
  }

  getTasks(cb) {
    return this.set.map(options => {
      return {
        title: `${options[2]}`,
        task() {
          return cb(options)
        }
      }
    })
  }

  runTasks(cb) {
    const tasks = new Listr(this.getTasks(cb), { concurrent: true, exitOnError: false })

    // const promises = tasks.map(async task => await task())
    // return Promise.all(promises)
    return tasks.run()
  }
}

module.exports = Page
