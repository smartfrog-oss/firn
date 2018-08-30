const path = require('path')
/* local */
const viewports = require('./viewport')

const resolve = pth => path.resolve(__dirname, '../../', pth)

const defaultConfig = {
  viewports,
  screenshotExt: 'png',
  legitShotPath: resolve('shots/legit'),
  pendingShotPath: resolve('.cache'),
  fishyShotPath: resolve('shots/fishy')
}

let usedConfig = defaultConfig

function mergeConfig(customConfig) {
  usedConfig = { ...defaultConfig, ...customConfig }
}

function getConfig() {
  return usedConfig
}

module.exports = {
  mergeConfig,
  getConfig
}
