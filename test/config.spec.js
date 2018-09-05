const config = require('../src/config')
const defaultConfig = require('../src/config/default')

describe('Config | getConfig', () => {
  it('getConfig expected return', () => {
    const result = config.getConfig()
    const expected = defaultConfig
    expect(result).toEqual(expected)
  })

  it('setConfig expected return', () => {
    const userConfig = { screenshotExt: 'jpg' }
    const result = config.mergeConfig(userConfig)
    const expected = Object.assign({}, defaultConfig, userConfig)
    expect(result.screenshotExt).toEqual('jpg')
    expect(result).toEqual(expected)
  })
})
