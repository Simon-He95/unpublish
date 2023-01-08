import process from 'process'
import { getPkg, jsShell, log, spaceFormat } from 'lazy-js-utils'
import colorize from '@simon_he/colorize'
import { version as VERSION } from '../package.json'

export async function setup() {
  const argv: string[] = process.argv.slice(2)
  const params = spaceFormat(argv.join(' ')).trim()
  if (params === '-v' || params === '--version') {
    log(
      colorize({
        text: `@simon_he/unpublish version: ${VERSION}`,
        color: 'blue',
      }),
      {},
    )
    return
  }
  const { name, version } = await getPkg()
  let publishedVersion = `${name}@`
  if (params)
    publishedVersion += params
  else publishedVersion += version + params
  const command = `npm unpublish ${colorize({
    bgColor: 'black',
    text: publishedVersion,
  })} ${params}\n`
  log(
    colorize({
      text: command,
      color: 'white',
    }),
    {},
  )

  jsShell(command)
}

setup()
