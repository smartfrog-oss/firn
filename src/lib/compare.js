const royax = require('royax')

async function compare(img1, img2, writeTo) {
  const [err, result] = await royax(img1, img2, writeTo)
  if (err) return [err]
  const match = result.match === 1
  return [null, match]
}

module.exports = compare
