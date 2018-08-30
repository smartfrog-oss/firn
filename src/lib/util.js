const { URL } = require('url')

function arrayArg(arg) {
  return Array.isArray(arg) ? arg : [arg]
}

function getPaths(url, { suffix = '', base, extension = 'png' } = {}) {
  if (!url) throw new Error('expected url')
  if (!base) throw new Error('expected base folder')
  const { host, pathname } = new URL(url)
  let name = pathname.replace('/', '').replace(/[^a-zA-Z0-9]/g, '_')
  name = name ? name : 'index'
  suffix = suffix ? `@${suffix}` : ''
  const folder = `${base}/${host}`
  const file = `${folder}/${name}${suffix}.${extension}`
  return { file, folder }
}

module.exports = {
  arrayArg,
  getPaths
}
