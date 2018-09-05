const page = {
  setViewport: jest.fn(),
  goto: jest.fn(),
  screenshot: jest.fn(() => Buffer.from('mock'))
}

const browser = {
  newPage: jest.fn(() => page)
}

module.exports = browser
