const diff = require('pixeldiff')

async function compare(img1, img2, writeTo) {
  const [err, result] = await diff(img1, img2, {}, writeTo)
  // console.log('result', result)
  if (err) return [err]
  const match = result.match === 1
  return [null, match]
}

module.exports = compare
