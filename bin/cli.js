#!/usr/bin/env node

const firn = require('../')
const log = require('../src/lib/log')

var program = require('commander')

program
  .version('0.1.0')
  .arguments('<url>')
  .option('-c, --config [path]', 'Remove recursively')
  .option('-u, --update', 'Update specefic Shots')
  .option('-a, --all', 'Update all Shots')
  .action(async function(url, config) {
    if (!url.startsWith('http')) url = `https://${url}`

    console.log('url ', url)
    // console.log('config ', program.config)
    const [err, raport] = await firn(url)
    if (err) log('😦 Oh No! ', err)
    log('📝  raport ', raport)
  })

program.parse(process.argv)
