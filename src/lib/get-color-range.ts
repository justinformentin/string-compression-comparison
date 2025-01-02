import { computeColor } from './compute-color'
import { ChartDataItem, ComparisonValueKey } from './types'

type GetColorRangeArgs = {
  items: ChartDataItem[]
  hiddenFuncs: string[]
  value: number
  valueKey: ComparisonValueKey
  flip: boolean
}

export function getColorRange({
  items,
  hiddenFuncs,
  value,
  valueKey,
  flip,
}: GetColorRangeArgs) {
  const values = items
    .filter((v) => !hiddenFuncs.includes(v.name))
    .map((item) => item[valueKey])

  const tempMin = Math.min(...values)
  const tempMax = Math.max(...values)
  const min = flip ? tempMax : tempMin
  const max = flip ? tempMin : tempMax

  const factor =
    value === min ? 1 : value === max ? 4 : 1 + ((value - min) / (max - min)) * (4 - 1)

  return computeColor(factor)
}
