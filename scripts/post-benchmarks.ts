import fs from 'fs'
import sizeData from '../output/size/ratio.json'

type SpeedData = {
  name: string
  date: string
  version: string
  fastest: { name: string; index: number }
  slowest: { name: string; index: number }
  results: {
    name: string
    ops: number
    margin: number
    percentSlower: number
  }[]
}

type FileMapItem = {
  compressedLength: number
  ratio: number
  equalOutput: boolean
  compress: number
  margin: number
  decompress: number
}

type FileMap = {
  [key: string]: {
    [key: string]: FileMapItem
  }
}
type ResultItem = FileMapItem & { name: string }
type Result = {
  file: string
  items: ResultItem[]
}[]
const fsPromise = fs.promises

const dir = './output'

function combineData(dataObj: typeof sizeData, resultsArray: SpeedData[]) {
  const result: Result = []

  // Create a map of file names to objects containing item data
  const fileMap: FileMap | {} = {}
  for (const [method, files] of Object.entries(dataObj)) {
    for (const fileData of files) {
      const { file, ...rest } = fileData
      if (!fileMap[file]) fileMap[file] = {}
      fileMap[file][method] = rest
    }
  }

  // Process the resultsArray to add compress and decompress data
  for (const { name, results } of resultsArray) {
    const [action, file] = name.split('-')
    for (const { name: methodName, ops, margin } of results) {
      if (fileMap[file] && fileMap[file][methodName]) {
        if (!fileMap[file][methodName][action]) {
          fileMap[file][methodName][action] = ops
        }
        if (!fileMap[file][methodName].margin) {
          fileMap[file][methodName].margin = margin
        }
      }
    }
  }

  // Transform the map into the desired output format
  for (const [file, methods] of Object.entries(fileMap)) {
    const items = Object.entries(methods).map(([name, data]) => ({ name, ...data }))
    result.push({ file, items })
  }

  return result
}

async function run() {
  const names = Object.keys(sizeData).map((k) => k)
  const keys = `export const chartKeys = ` + JSON.stringify(names)
  fs.writeFile('./chart-data/keys.ts', keys, 'utf8', () => {})

  const files = await fsPromise.readdir(`${dir}/speed`)

  const speedData: SpeedData[] = []
  for (const file of files) {
    const data = await fsPromise.readFile(`${dir}/speed/${file}`)
    // @ts-ignore It is a string for our purposes, not Buffer<ArrayBufferLike>
    const parsedSpeedData = JSON.parse(data)
    speedData.push(parsedSpeedData)
  }

  const combined = combineData(sizeData, speedData)

  const str = `export const chartData = ` + JSON.stringify(combined, null, 4)
  fs.writeFile('./chart-data/index.ts', str, 'utf8', () => {})
}

run()
