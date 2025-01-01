import { chartKeys } from '../chart-data/keys'
import { chartData } from '../chart-data/chart-data'
import { libSizes } from '../chart-data/lib-sizes'
import { fileSizes } from '../chart-data/file-sizes'
import { useState } from 'react'

const computeColor = (factor: number /* 1 to 4 */) => {
  if (factor < 3.0) {
    const a = factor - 1.0
    const r = (1.0 - a) * 99 + a * 255
    const g = (1.0 - a) * 191 + a * 236
    const b = (1.0 - a) * 124 + a * 132
    return `rgb(${r.toFixed(0)}, ${g.toFixed(0)}, ${b.toFixed(0)})`
  } else {
    const a = Math.min((factor - 2.0) / 2.0, 1.0)
    const r = (1.0 - a) * 255 + a * 249
    const g = (1.0 - a) * 236 + a * 105
    const b = (1.0 - a) * 132 + a * 108
    return `rgb(${r.toFixed(0)}, ${g.toFixed(0)}, ${b.toFixed(0)})`
  }
}

function Table({
  title,
  getFileName,
  getValue,
  flip,
}: {
  title: string
  getFileName?: (s: string) => string
  getValue: (item: any) => number
  flip?: boolean
}) {
  const [hiddenFuncs, setHiddenFuncs] = useState<string[]>([])
  const updateHiddenFuncs = (e: any, func: string) => {
    !e.target.checked
      ? setHiddenFuncs((prev) => [...prev, func])
      : setHiddenFuncs((prev) => prev.filter((f) => f !== func))
  }

  const filteredChartData =
    chartData?.length &&
    chartData.map((c) => {
      return { ...c, items: c.items.filter((item) => !hiddenFuncs.includes(item.name)) }
    })
  console.log('filteredChartDat', filteredChartData)
  return (
    <div className="p-4">
      <div className="text-lg text-center">{title}</div>
      <table className="mx-auto">
        <thead>
          <tr>
            <th></th>
            {chartKeys.map((key: string, idx: number) => (
              <th
                key={key + idx}
                className="text-sm border-x border-t border-gray-500 p-2 min-w-[120px]"
              >
                <div className="flex">
                  <div className="mr-2">{key}</div>
                  <input
                    type="checkbox"
                    checked={!hiddenFuncs.includes(key)}
                    onChange={(e) => updateHiddenFuncs(e, key)}
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chartData.map((d, idx) => {
            const values = d.items
              .filter((v) => !hiddenFuncs.includes(v.name))
              .map((item) => getValue(item))

            const tempMin = Math.min(...values)
            const tempMax = Math.max(...values)
            const min = flip ? tempMax : tempMin
            const max = flip ? tempMin : tempMax

            return (
              <tr key={d.file + idx}>
                <th className="border-y border-l border-gray-500 px-2 text-xs min-w-[139px]">
                  {getFileName ? getFileName(d.file) : d.file}
                </th>
                {d.items.map((item) => {
                  if (hiddenFuncs.includes(item.name))
                    return <td className="border border-gray-500 px-4 py-2"></td>
                  const value = getValue(item)
                  const factor =
                    value === min
                      ? 1
                      : value === max
                      ? 4
                      : 1 + ((value - min) / (max - min)) * (4 - 1)

                  const style = { background: computeColor(factor) }
                  return (
                    <td
                      style={style}
                      className="border border-gray-500 px-4 py-2"
                      key={item.name + getValue(item)}
                    >
                      {value}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function LibSizes() {
  console.log()

  const keys = Object.keys(libSizes);
  console.log('keys', keys)
  return (
    <div className="p-4">
      <div className="text-lg text-center">Library Size</div>
      <table className="mx-auto">
        <thead>
          <tr>
            {/* <th></th> */}
            {keys.map((key) => (
              <th
                key={key}
                className="text-sm border-x border-t border-gray-500 p-2 min-w-[120px]"
              >
                <div className="flex">
                  <div className="mr-2">{key}</div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* <td></td> */}
            {keys.map((k) => {
              console.log('libSizes[k].minified', libSizes[k].minified)
              return (
                <td
                  key={libSizes[k].minified}
                  className="border border-gray-500 px-4 py-2"
                >
                  {libSizes[k].minified}
                </td>
              )
            })}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
function App() {
  const getSizeFileName = (n: string) => `${n} (${fileSizes?.[n]})`

  return (
    <div className="overflow-auto px-8">
      <LibSizes />
      <Table
        title="Compression Speed (ops/s)"
        getValue={(item) => item.compress.ops}
        flip
      />
      <Table
        title="Decompression Speed (ops/s)"
        getValue={(item) => item.decompress.ops}
        flip
      />
      <Table
        title="Size (in bytes)"
        getFileName={getSizeFileName}
        getValue={(item) => item.compressedLength}
      />
    </div>
  )
}

export default App
