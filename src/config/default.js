const path = require('path')
/* local */

const viewports = require('./viewport')

const resolve = pth => path.resolve(__dirname, '../../', pth)

const config = {
  viewports,
  screenshotExt: 'png',
  tmpShotPath: resolve('.cache'),
  legitShotPath: resolve('__shots__/legit'),
  fishyShotPath: resolve('__shots__/fishy'),
  diffShotPath: resolve('__shots__/diff')
}

module.exports = config
