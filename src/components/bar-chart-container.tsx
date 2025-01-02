import { useMemo, useState } from 'react'
import { AxisOptions, Chart } from 'react-charts'
import { chartData } from '../../chart-data'
import { chartKeys } from '../../chart-data/keys'
import { fileSizes } from '../../chart-data/file-sizes'
import ResizableBox from './resizable-box'
import { ChartKeys } from '../lib/types'
import { ChartButton } from './chart-button'

type ExcludesFalse = <T>(x: T | false) => x is T

export function BarChartContainer() {
  const [activeType, setActiveType] = useState<'compress' | 'decompress'>('compress')
  const files = Object.keys(fileSizes).map((k) => k)
  const [activeCharts, setActiveCharts] = useState(files)
  // Clone chart keys because they are readonly
  const algos = [...chartKeys]
  const [activeAlgos, setActiveAlgos] = useState(algos)

  const data = useMemo(() => {
    const filtered = chartData.filter((c) => activeCharts.includes(c.file))
    return filtered?.length
      ? filtered?.map((f) => ({
          label: f.file,
          data: f.items
            .map(
              (item) =>
                activeAlgos.includes(item.name) && {
                  name: item.name,
                  ops: item[activeType],
                },
            )
            .filter(Boolean as any as ExcludesFalse),
        }))
      : []
  }, [activeCharts, activeType, activeAlgos])

  const primaryAxis = useMemo<AxisOptions<(typeof data)[number]['data'][number]>>(
    () => ({
      getValue: (datum: any) => (activeAlgos.includes(datum.name) ? datum.name : null),
    }),
    [activeAlgos],
  )

  const secondaryAxes = useMemo<AxisOptions<(typeof data)[number]['data'][number]>[]>(
    () => [{ getValue: (datum: any) => datum?.ops }],
    [],
  )

  const updateActiveChart = (key: string) => {
    activeCharts.includes(key)
      ? activeCharts.length > 1 &&
        setActiveCharts((prev) => prev.filter((a) => a !== key))
      : setActiveCharts((prev) => [...prev, key])
  }
  const updateActiveAlgos = (key: ChartKeys) => {
    activeAlgos.includes(key)
      ? activeAlgos.length > 1 && setActiveAlgos((prev) => prev.filter((a) => a !== key))
      : setActiveAlgos((prev) => [...prev, key])
  }
  return (
    <div className="max-w-[1120px] mx-auto">
      <div className="mt-4">
        <div className="space-x-2 mb-2">
          <ChartButton
            color="teal"
            onClick={() => setActiveType('compress')}
            active={activeType === 'compress'}
          >
            Compress
          </ChartButton>
          <ChartButton
            color="teal"
            onClick={() => setActiveType('decompress')}
            active={activeType === 'decompress'}
          >
            Decompress
          </ChartButton>
        </div>
        <div className="mr-2 [&>button]:mb-2 [&>button]:mr-2">
          {Object.keys(fileSizes).map((key: string) => (
            <ChartButton
              key={key}
              color="indigo"
              active={activeCharts.includes(key)}
              onClick={() => updateActiveChart(key)}
            >
              {key}
            </ChartButton>
          ))}
        </div>
        <div className="mr-2 [&>button]:mb-2 [&>button]:mr-2">
          {algos.map((key) => (
            <ChartButton
              key={key}
              color="sky"
              active={activeAlgos.includes(key)}
              onClick={() => updateActiveAlgos(key)}
            >
              {key}
            </ChartButton>
          ))}
        </div>
      </div>
      <ResizableBox>
        <Chart
          // @ts-ignore
          options={{
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </ResizableBox>
    </div>
  )
}
