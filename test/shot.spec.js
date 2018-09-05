const browserMock = require('../__mocks__/browser.mock')
const makeDir = require('make-dir')
const royax = require('royax')

const Shot = require('../src/lib/shot')
const config = require('../src/config').getConfig()
const viewports = config.viewports

const url = 'https://example.com'

describe('Shot | contructor', () => {
  it('should construct properly', () => {
    const shot = new Shot(url, viewports.mobile, 'mobile')
    expect(shot.url).toEqual(url)
    expect(shot.suffix).toEqual('mobile')
    expect(shot.viewport).toEqual(viewports.mobile)
  })

  it('should construct properly with missing params', () => {
    const shot = new Shot(url)
    expect(shot.url).toEqual(url)
    expect(shot.suffix).toEqual('laptop')
    expect(shot.viewport).toEqual(viewports.laptop)
  })
})

describe('Shot | capture', () => {
  let shot, page

  beforeEach(() => {
    shot = new Shot(url, viewports.mobile, 'mobile')
    page = browserMock.newPage()
  })

  it('should return buffer', async () => {
    const result = await shot.capture()
    const expected = Buffer.from('mock')
    expect(result).toEqual(expected)
  })

  it('should store screenshot in pending path', async () => {
    await shot.capture()
    expect(makeDir).toBeCalled()
    expect(page.setViewport).toBeCalledWith(expect.objectContaining(viewports.mobile))
    expect(page.goto).toBeCalled()

    expect(page.screenshot).toBeCalledWith(expect.any(Object))
    expect(page.screenshot).toBeCalledWith(expect.objectContaining({ path: expect.any(String), fullPage: true }))
    expect(page.screenshot).toBeCalledWith(expect.objectContaining({ path: expect.stringContaining(shot.paths.pending.file), fullPage: true }))
  })

  it('should store screenshot in legit path', async () => {
    await shot.capture({ isLegit: true })
    expect(makeDir).toBeCalled()
    expect(page.setViewport).toBeCalledWith(expect.objectContaining(viewports.mobile))
    expect(page.goto).toBeCalled()

    expect(page.screenshot).toBeCalledWith(expect.any(Object))
    expect(page.screenshot).toBeCalledWith(expect.objectContaining({ path: expect.any(String), fullPage: true }))
    expect(page.screenshot).toBeCalledWith(expect.objectContaining({ path: expect.stringContaining(shot.paths.legit.file), fullPage: true }))
  })
})

describe('Shot | check', () => {
  let shot, page

  beforeEach(() => {
    shot = new Shot(url, viewports.mobile, 'mobile')
    page = browserMock.newPage()
  })

  it('should return true', async () => {
    shot.hasLegit = jest.fn(() => true)
    royax.mockResult([null, { match: 1 }])
    const match = await shot.check()
    expect(match).toEqual(true)
  })

  it.skip('should throw error', async () => {
    // expect.assertions(1)
    shot.hasLegit = jest.fn(() => true)
    royax.mockResult([null, { match: 0 }])

    expect(shot.check()).rejects.toContain({ message: /shots are not matching/ })
  })
})
