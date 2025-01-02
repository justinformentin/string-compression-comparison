import { funcs } from '../shared/funcs.js'
import { data } from '../shared/data.js'

export const benchmarks = funcs
  .map((func) =>
    data.map((d) => ({
      title: d.title,
      source: d.source,
      compressionMethod: func.title,
      compressFn: func.encode,
      decompressFn: func.decode,
    })),
  )
  .flat()
