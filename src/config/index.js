const path = require('path')
/* local */
const viewports = require('./viewport')

const resolve = pth => path.resolve(__dirname, '../../', pth)

const config = {
  viewports,
  screenshotExt: 'png',
  legitShotPath: resolve('shots/legit'),
  pendingShotPath: resolve('.cache'),
  fishyShotPath: resolve('shots/fishy')
}

module.exports = config
