const raport = {}

function add({ url, suffix }, data) {
  if (!raport[url]) raport[url] = {}
  raport[url][suffix] = data
  return raport
}

function get() {
  return raport
}

function isObject(object) {
  return object !== null && typeof object === 'object'
}

module.exports = {
  add,
  get
}
