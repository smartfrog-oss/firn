const fs = require('fs')
/* npm */
const makeDir = require('make-dir')
const moveFile = require('move-file')
const royax = require('royax')

/* local */
const compare = require('./compare')
const { getPaths } = require('./util')
const raport = require('./raport')

class Shot {
  constructor(url, viewport, suffix = 'laptop') {
    const config = global.config

    this.viewport = viewport || config.viewports.laptop
    this.url = url
    this.suffix = suffix
    this.paths = {
      tmp: getPaths(url, { suffix, base: config.tmpShotPath, extension: config.screenshotExt }),
      legit: getPaths(url, { suffix, base: config.legitShotPath, extension: config.screenshotExt })
      // fishy: getPaths(url, { suffix, base: config.fishyShotPath, extension: config.screenshotExt }),
      // diff: getPaths(url, { suffix, base: config.diffShotPath, extension: config.screenshotExt })
    }
    // log('list', this.paths)
    // this.spinner = ora(`${url}@${suffix}`)
  }

  async capture({ isLegit = false } = {}) {
    const paths = isLegit ? this.paths.legit : this.paths.tmp
    await makeDir(paths.folder)
    const page = await global.browser.newPage()
    page.setViewport(this.viewport)
    await page.goto(this.url, { waitUntil: 'networkidle2' })
    const buffer = await page.screenshot({ path: paths.file, fullPage: true })
    page.close() // no need to wait until page is closed
    return buffer
  }

  async check() {
    if (!this.hasLegit) {
      await this.legitimate()
      return true
    }
    await this.capture()
    const [err, match] = await compare(this.ligitPath, this.tmpPath)
    if (err) throw new Error(err)
    raport.add({ url: this.url, suffix: this.suffix }, { match })

    // await moveFile(this.tmpPath, this.fishyPath)
    // if (!match) throw new Error(`shots are not matching: ${this.url}@${this.suffix}`)
    // console.log('match', match)
    return match
  }

  async legitimate() {
    await this.capture({ isLegit: true })
  }

  get hasLegit() {
    return fs.existsSync(this.paths.legit.file)
  }

  /** paths getter */

  get tmpPath() {
    return this.paths.tmp.file
  }

  get ligitPath() {
    return this.paths.legit.file
  }

  // get fishyPath() {
  //   return this.paths.fishy.file
  // }

  // get diffPath() {
  //   return this.paths.diff.file
  // }
}

module.exports = Shot
