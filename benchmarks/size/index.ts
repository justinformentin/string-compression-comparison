import fs from 'fs'
import { benchmarks } from '../shared/benchmarks'

const res = {}

function benchmark(opts) {
  const length = opts.source.length
  const encoded = opts.compressFn(opts.source)
  const decoded = opts.decompressFn(encoded);

  const encodedLength = encoded.length
  const ratio = Math.floor((encodedLength / length) * 10000.0) / 100.0

  if (!res[opts.compressionMethod]) res[opts.compressionMethod] = []
  res[opts.compressionMethod].push({
    file: opts.title,
    compressedLength: encodedLength,
    ratio,
    equalOutput: decoded === opts.source
  })

  return encodedLength
}

function run() {
  benchmarks.forEach((b) => {
    benchmark(b)
  })

  const json = JSON.stringify(res)
  fs.writeFile('./output/size/ratio.json', json, 'utf8', () => {
    process.exit()
  })
}
run()
