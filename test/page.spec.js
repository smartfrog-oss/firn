const Page = require('../src/lib/page')
const viewports = require('../src/config/viewport')

const urls = ['https://example.com', 'https://example.com/subpage']
const url = urls[0]

const expectedSort = [
  ['https://example.com', { height: 600, width: 425 }, 'mobile'],
  ['https://example.com', { height: 600, width: 800 }, 'tablet'],
  ['https://example.com', { height: 600, width: 1000 }, 'laptop'],
  ['https://example.com', { height: 600, width: 1300 }, 'laptopL']
]

describe('Page | sort', () => {
  it('should generate right sort', () => {
    const result = Page.sort(url, viewports)
    const expected = expectedSort
    expect(result).toEqual(expected)
  })
})

describe('Page | getTasks', () => {
  it('should generate right tasks', () => {
    const page = new Page(url)
    const max = Object.keys(viewports).length
    let count = 0
    const tasks = page.getTasks(() => ++count)
    expect(tasks).toEqual(expect.arrayContaining([{ task: expect.any(Function), title: expect.any(String) }]))
    tasks.map(({ task }) => task())
    expect(count).toEqual(max)
  })

  it('should generate right tasks | with right args', () => {
    const page = new Page(url)
    let cb = jest.fn()
    const tasks = page.getTasks(cb)
    expect(tasks).toEqual(expect.arrayContaining([{ task: expect.any(Function), title: expect.any(String) }]))
    tasks[0].task()
    expect(cb).toHaveBeenCalledTimes(1)
    expect(cb).toHaveBeenCalledWith(expect.arrayContaining(expectedSort[0]))
  })
})

describe('Page | runTasks', () => {
  it('should generate run tasks | all', async () => {
    const page = new Page(url)
    const max = Object.keys(viewports).length

    cb = jest.fn()
    const promise = page.runTasks(cb)
    expect(promise).toEqual(expect.any(Promise))
    const result = await promise

    expect(cb).toHaveBeenCalledTimes(max)
    expect(cb).toHaveBeenCalledWith(expect.arrayContaining(expectedSort[0]))
    expect(cb).toHaveBeenCalledWith(expect.arrayContaining(expectedSort[1]))
    expect(cb).toHaveBeenCalledWith(expect.arrayContaining(expectedSort[2]))
    expect(cb).toHaveBeenCalledWith(expect.arrayContaining(expectedSort[3]))
  })
})
