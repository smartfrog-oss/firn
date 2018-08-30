const log = require('../src/lib/log')

describe('log', () => {
  it('should log when DEBUG_MODE', () => {
    const previous = process.env.DEBUG_MODE
    process.env.DEBUG_MODE = 'true'
    log('tada')
    expect(console.log).toHaveBeenLastCalledWith(expect.any(String), expect.stringMatching(/tada/))
    process.env.DEBUG_MODE = previous
  })

  // it('should not log when not DEBUG_MODE', () => {
  //   const previous = process.env.DEBUG_MODE
  //   process.env.DEBUG_MODE = ''
  //   log('adat')
  //   expect(console.log).toHaveBeenLastCalledWith(expect.any(String), expect.stringMatching(/tada/))
  //   process.env.DEBUG_MODE = previous
  // })
})
