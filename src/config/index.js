/* local */
const defaultConfig = require('./default')

let usedConfig = { ...defaultConfig }

function mergeConfig(userConfig) {
  usedConfig = { ...defaultConfig, ...userConfig }
  return usedConfig
}

function getConfig() {
  return usedConfig
}

module.exports = {
  mergeConfig,
  getConfig
}
