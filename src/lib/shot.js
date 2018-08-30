const fs = require('fs')
/* npm */
const makeDir = require('make-dir')

/* local */
const config = require('../config').getConfig()
// const log = require('./log')
const compare = require('./compare')
const { getPaths } = require('./util')

const viewports = config.viewports

class Shot {
  constructor(url, viewport = viewports.laptop, suffix = 'laptop') {
    this.url = url
    this.paths = {
      legit: getPaths(url, { suffix, base: config.legitShotPath, extension: config.screenshotExt }),
      pending: getPaths(url, { suffix, base: config.pendingShotPath, extension: config.screenshotExt }),
      fishy: getPaths(url, { suffix, base: config.fishyShotPath, extension: config.screenshotExt })
    }
    this.viewport = viewport
    // log('list', this.paths)
    // this.spinner = ora(`${url}@${suffix}`)
  }

  async capture({ isLegit = false } = {}) {
    const paths = isLegit ? this.paths.legit : this.paths.pending

    await makeDir(paths.folder)
    // log('smile  📷 ', this.url, this.viewport)
    const page = await global.browser.newPage()
    page.setViewport(this.viewport)
    await page.goto(this.url, { waitUntil: 'networkidle2' })
    const buffer = await page.screenshot({ path: paths.file, fullPage: true })
    // await await page.closers()
    // log('captured 📸 ', this.url, this.viewport)
    return buffer
  }

  hasLegit() {
    return fs.existsSync(this.paths.legit.file)
  }

  async check() {
    // this.spinner.start()
    if (!this.hasLegit()) {
      // log('this is a new shot, it will be legitimate now for future use')
      await this.legitimate()
      return true
    }

    // log('path', this.ligitPath)
    const buffer = await this.capture()
    // const [err, match] = await compare(this.ligitPath, buffer)
    await makeDir(this.paths.fishy.folder)
    const [err, match] = await compare(this.ligitPath, this.pendingPath, this.fishyPath)
    if (err) throw new Error(err)
    // this.spinner.stop()
    return match
  }

  async legitimate() {
    await this.capture({ isLegit: true })
  }

  get ligitPath() {
    return this.paths.legit.file
  }

  get pendingPath() {
    return this.paths.pending.file
  }

  get fishyPath() {
    return this.paths.fishy.file
  }
}

module.exports = Shot
