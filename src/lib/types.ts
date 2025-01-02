export type ComparisonValueKey = 'compressedLength' | 'compress' | 'decompress'

export type ChartDataItem = {
  name: string
  compressedLength: number
  ratio: number
  equalOutput: boolean
  compress: number
  margin: number
  decompress: number
}

export type ChartData = {
  file: string
  items: ChartDataItem[]
}[]
