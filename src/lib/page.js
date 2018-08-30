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
      return function task() {
        return cb(options)
      }
    })
  }

  runTasks(cb) {
    const tasks = this.getTasks(cb)
    const promises = tasks.map(async task => await task())
    return Promise.all(promises)
  }
}

module.exports = Page
