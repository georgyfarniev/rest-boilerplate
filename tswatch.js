#!/usr/bin/env node

/**
 * This scripts helps to watch changes in typescript projects, such as servers
 */
const TscWatchClient = require('tsc-watch/client')
const watch = new TscWatchClient()
const yargs = require('yargs')

watch.on('first_success', () => console.log('[ FIRST BUILD OK ]'))
watch.on('success', () => console.log('[ BUILD OK ]'))
watch.on('compile_errors', () => console.error('[ !!! BUILD HAS ERRORS !!! ]'))

if (require.main === module) {
  const { argv } = yargs
    .usage('Usage: $0 [options]')
    .option('project', { 
      alias: 'p',
      type: 'string',
      default: 'tsconfig.json'
    })
    .option('exec', {
      alias: 'e',
      type: 'string',
      default: 'npm run start'
    })
    .help('h').alias('h', 'help')

  const params = [
    '-p',           argv.project,
    '--onSuccess',  argv.exec
  ]

  watch.start(...params)
}
