import { useState } from 'react'
import { chartKeys } from '../../chart-data/keys'
import { chartData } from '../../chart-data/chart-data'
import { computeColor } from '../lib/compute-color'
import { Table } from './table'

export function ComparisonTable({
  title,
  getFileName,
  getValue,
  flip,
  ratio,
}: {
  title: string
  getFileName?: (s: string) => string
  getValue: (item: any) => number
  flip?: boolean
  ratio?: boolean
}) {
  const [hiddenFuncs, setHiddenFuncs] = useState<string[]>([])
  const updateHiddenFuncs = (e: any, func: string) => {
    !e.target.checked
      ? setHiddenFuncs((prev) => [...prev, func])
      : setHiddenFuncs((prev) => prev.filter((f) => f !== func))
  }

  return (
    <Table title={title}>
      <>
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
              <tr key={d.file + idx + title}>
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
                  console.log('item', item)
                  return (
                    <td
                      style={style}
                      className="border border-gray-500 px-4 py-2"
                      key={item.name + getValue(item)}
                    >
                      <div>{value}</div>

                      {ratio ? <div className="text-sm font-semibold">{`(${item.ratio}%)`}</div> : null}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </>
    </Table>
  )
}
