import { libSizes } from '../../chart-data/lib-sizes'
import { Table } from './table'

type LibSizeKey = keyof typeof libSizes

export function LibSizesTable() {
  //@ts-ignore
  const keys: LibSizeKey[] = Object.keys(libSizes)
  return (
    <Table title="Library Size">
      <>
        <thead>
          <tr>
            <th></th>
            {keys.map((key) => (
              <th
                key={key}
                className="text-sm border-x border-t border-gray-500 p-2 px-[14px] min-w-[120px]"
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="px-2 text-xs min-w-[139px]"></th>
            {keys.map((k, idx) => {
              return (
                <td
                  key={libSizes[k].minified + idx}
                  className="border border-gray-500 px-4 py-2"
                >
                  {libSizes[k].minified}
                </td>
              )
            })}
          </tr>
        </tbody>
      </>
    </Table>
  )
}
