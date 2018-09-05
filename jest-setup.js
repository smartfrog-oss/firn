const browser = require('./__mocks__/browser.mock')
// const consoleLog = console.log
console.log = jest.fn()

/* start browser mock */

global.browser = browser

/* end browser mock */
