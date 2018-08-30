const { arrayArg, getPaths } = require('../src/lib/util')
const viewports = require('../src/config/viewport')

const urls = ['https://example.com', 'https://example.com/subpage']
const url = urls[0]

describe('Util | arrayArg', () => {
  it('should return valid output from array', () => {
    const result = arrayArg(urls)
    const expected = urls
    expect(result).toEqual(expected)
  })

  it('should return valid output from string', () => {
    const result = arrayArg(url)
    const expected = urls
    expect(result).toEqual([url])
  })
})

describe('Util | getPaths', () => {
  it('should return valid output', () => {
    const result = getPaths(urls[1], { suffix: 'mobile', base: '.cache/tmp', extension: 'png' })
    const expected = { file: '.cache/tmp/example.com/subpage@mobile.png', folder: '.cache/tmp/example.com' }
    expect(result).toEqual(expected)
  })

  it('should return valid output for top level domain', () => {
    const result = getPaths(url, { suffix: 'mobile', base: '.cache/tmp', extension: 'png' })
    const expected = { file: '.cache/tmp/example.com/index@mobile.png', folder: '.cache/tmp/example.com' }
    expect(result).toEqual(expected)
  })

  it('should throw error with missing suffix', () => {
    const result = getPaths(url, { base: '.cache/tmp', extension: 'png' })
    const expected = { file: '.cache/tmp/example.com/index.png', folder: '.cache/tmp/example.com' }
    expect(result).toEqual(expected)
  })

  it('should throw error with missing suffix subpage', () => {
    const result = getPaths(urls[1], { base: '.cache/tmp', extension: 'png' })
    const expected = { file: '.cache/tmp/example.com/subpage.png', folder: '.cache/tmp/example.com' }
    expect(result).toEqual(expected)
  })

  it('should throw error with missing args', () => {
    expect(() => getPaths()).toThrowError(/url/)
    expect(() => getPaths(url, {})).toThrowError(/base/)
  })
})
