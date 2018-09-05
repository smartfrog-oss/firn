/* local */
const defaultConfig = require('./default')

let usedConfig = defaultConfig

function mergeConfig(userConfig) {
  usedConfig = { ...defaultConfig, ...userConfig }
}

function getConfig() {
  return usedConfig
}

module.exports = {
  mergeConfig,
  getConfig
}
