import fs from 'fs'
import { funcs } from '../shared/funcs.js'
import { data } from '../shared/data.js'

const benchmarks = funcs
  .map((func) => {
    return data.map((d) => {
      return {
        title: d.title,
        source: d.source,
        compressionMethod: func.title,
        compressFn: func.encode,
      }
    })
  })
  .flat()

const res = {}

function benchmark(opts) {
  const length = opts.source.length
  const encoded = opts.compressFn(opts.source)

  const encodedLength = encoded.length
  const ratio = Math.floor((encodedLength / length) * 10000.0) / 100.0
  console.log(`${opts.title} - ${opts.compressionMethod}`)
  // console.log(`Compressed length: ${encodedLength} chars`)
  // console.log(`Compression ratio: ${ratio}%\n`)

  if (!res[opts.compressionMethod]) res[opts.compressionMethod] = []
  res[opts.compressionMethod].push({
    file: opts.title,
    compressedLength: encodedLength,
    ratio,
  })

  return encodedLength
}

benchmarks.forEach((b) => {
  benchmark(b)
})

const json = JSON.stringify(res)
fs.writeFile('./public/size/ratio.json', json, 'utf8', () => { })
