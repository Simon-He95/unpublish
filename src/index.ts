import process from 'process'
import { getPkg, isVersion, jsShell, log, spaceFormat } from 'lazy-js-utils'
import colorize from '@simon_he/colorize'
import { version as VERSION } from '../package.json'

export async function setup() {
  const argv: string[] = process.argv.slice(2)
  let params = spaceFormat(argv.join(' ')).trim()
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
  let publishedVersion = ''
  if (params === '-f' || params === '--force')
    params = ` ${params}`

  if (
    !params
    || isVersion(params)
    || params === ' -f'
    || params === ' --force'
  ) {
    publishedVersion += `${name}@`
    if (params)
      publishedVersion += params
    else publishedVersion += version + params
  }
  else if (params) {
    publishedVersion += params
    params = ''
  }

  const command = `npm unpublish ${colorize({
    bgColor: 'black',
    text: publishedVersion,
  })}\n`
  log(
    colorize({
      text: command,
      color: 'white',
    }),
    {},
  )

  jsShell(`npm unpublish ${publishedVersion}`)
}

setup()
