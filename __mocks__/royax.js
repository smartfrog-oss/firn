const royax = jest.fn(x => {
  throw new Error(`\n ${x} NOT MOCKED`)
})

royax.mockResult = data => {
  royax.mockImplementationOnce(() => data)
}

module.exports = royax
