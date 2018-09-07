const raport = require('../src/lib/raport')

describe('raport | add', () => {
  it('should add and get ', () => {
    raport.add({ url: 'example.com', suffix: 'mobile' }, { match: true })
    raport.add({ url: 'example.com', suffix: 'tablet' }, { match: false })
    // raport.add('test.a.c', 'z')
    const result = raport.get()
    const expected = { 'example.com': { mobile: { match: true }, tablet: { match: false } } }
    expect(result).toEqual(expected)
  })
})
