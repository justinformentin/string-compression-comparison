import { useState } from 'react'
import { chartKeys } from '../../chart-data/keys'
import { chartData } from '../../chart-data'
import { Table } from './table'
import { ComparisonValueKey } from '../lib/types'
import { getColorRange } from '../lib/get-color-range'

type ComparisonTableProps = {
  title: string
  valueKey: ComparisonValueKey
  getFileName?: (s: string) => string
  flip?: boolean
  ratio?: boolean
}

export function ComparisonTable({
  title,
  getFileName,
  valueKey,
  flip = false,
  ratio,
}: ComparisonTableProps) {
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
            return (
              <tr key={d.file + idx + title}>
                <th className="border-y border-l border-gray-500 px-2 text-xs min-w-[139px]">
                  {getFileName ? getFileName(d.file) : d.file}
                </th>
                {d.items.map((item) => {
                  if (hiddenFuncs.includes(item.name))
                    return <td className="border border-gray-500 px-4 py-2"></td>
                    
                  const value = item[valueKey]

                  const style = item.equalOutput
                    ? {
                        background: getColorRange({
                          items: d.items,
                          hiddenFuncs,
                          value,
                          valueKey,
                          flip,
                        }),
                      }
                    : { background: 'black', color: 'white' }

                  return (
                    <td
                      style={style}
                      className="border border-gray-500 px-4 py-2"
                      key={item.name + item[valueKey]}
                    >
                      <div>{value}</div>

                      {ratio ? (
                        <div className="text-sm font-semibold">{`(${item.ratio}%)`}</div>
                      ) : null}
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
