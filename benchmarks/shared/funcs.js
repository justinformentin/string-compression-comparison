import { LZW } from '../../src/lzw.js'
import { lzw_encode, encode_utf8, decode_utf8, lzw_decode } from '../../src/lzw-map.js'
import LZUTF8 from 'lzutf8'
import lzjs from 'lzjs'
import { LZString } from '../../src/lz-string.js'
import { dictionary } from 'compatto/dictionary'
import { compatto } from 'compatto'
import LZUTF8_LIGHT from 'lzutf8-light'
import { compress as SmolCompress, decompress as SmolDecompress } from 'smol-string'

const compatto_lib = compatto({ dictionary })

export const funcs = [
  {
    title: 'LZW-Map',
    encode: lzw_encode,
    decode: lzw_decode,
  },
  {
    title: 'LZW',
    encode: LZW.compress,
    decode: LZW.decompress,
  },
  {
    title: 'LZJS',
    encode: lzjs.compress,
    decode: lzjs.decompress,
  },
  {
    title: 'LZUTF8',
    encode: LZUTF8.compress,
    decode: LZUTF8.decompress,
  },
  {
    title: 'LZUTF8_LIGHT',
    encode: LZUTF8_LIGHT.compress,
    decode: LZUTF8_LIGHT.decompress,
  },
  {
    title: 'LZString',
    encode: LZString.compress,
    decode: LZString.decompress,
  },
  {
    title: 'Compatto',
    encode: compatto_lib.compress,
    decode: compatto_lib.decompress,
  },
  {
    title: 'SmolString',
    encode: SmolCompress,
    decode: SmolDecompress,
  },
  // {
  // 	title: "lzw",
  // 	encode: (s) => util.compress(s, lzw.encode),
  // 	decode: (s) => util.decompress(s, lzw.decode)
  // },
]
