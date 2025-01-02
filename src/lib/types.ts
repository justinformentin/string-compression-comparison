import { fileSizes } from '../../chart-data/file-sizes'
import { chartKeys } from '../../chart-data/keys'

export type ComparisonValueKey = 'compressedLength' | 'compress' | 'decompress'

export type ChartKeys = (typeof chartKeys)[any]
export type FileKeys = keyof typeof fileSizes

export type ChartDataItem = {
  name: ChartKeys
  compressedLength: number
  ratio: number
  equalOutput: boolean
  compress: number
  margin: number
  decompress: number
}

export type ChartData = {
  file: FileKeys
  items: ChartDataItem[]
}[]
