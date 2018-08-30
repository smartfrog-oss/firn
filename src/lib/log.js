module.exports = function log(...args) {
  // if (!process.env.DEBUG_MODE) return
  console.log('\n'.concat(new Date().toLocaleString(), '➡️      '), ...args)
}
