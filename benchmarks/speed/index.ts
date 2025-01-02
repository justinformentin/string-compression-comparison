import { add, suite } from 'benny'
import { handlers } from './handlers.js'
import { funcs } from '../shared/funcs.js'
import { data } from '../shared/data.js'

const runCompress = ({ title, source }) =>
  suite(
    'compress-' + title,
    ...funcs.map((func) =>
      add(func.title, () => {
        func.encode(source)
      }),
    ),
    ...handlers('compress-' + title),
  )
const runDecompress = ({ title, source }) =>
  suite(
    'decompress-' + title,
    ...funcs.map((func) =>
      add(func.title, () => {
        const compressed = func.encode(source)
        return () => func.decode(compressed)
      }),
    ),
    ...handlers('decompress-' + title),
  )

data.forEach((s) => {
  runCompress(s)
  runDecompress(s)
})
