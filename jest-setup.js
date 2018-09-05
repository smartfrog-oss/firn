const browser = require('./__mocks__/browser.mock')
const { getConfig } = require('./src/config')
// const consoleLog = console.log
console.log = jest.fn()

/* start browser mock */

global.browser = browser
global.config = getConfig()
/* end browser mock */
