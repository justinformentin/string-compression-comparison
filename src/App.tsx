import { fileSizes } from '../chart-data/file-sizes'
import { ComparisonTable } from './components/comparison-table'
import { LibSizesTable } from './components/lib-size-table'

function App() {
  const getSizeFileName = (n: keyof typeof fileSizes) => `${n} (${fileSizes?.[n]})`

  return (
    <div className="pb-8">
      <div className="mx-auto text-center py-6 ml-[120px]">
        <div className="border border-gray-500 py-2 px-4 inline-block">
          <span className="font-semibold mr-2">How to read table:</span>
          <span className="text-green-600 font-semibold">Green</span> is better,{' '}
          <span className="text-red-600 font-semibold">Red</span> is worse.{' '}
          <span className="font-semibold">Black</span> means
          the output does not match the input, so it's invalid and unusable.
        </div>
      </div>
      <LibSizesTable />
      <ComparisonTable title="Compression Speed (ops/s)" valueKey="compress" flip />
      <ComparisonTable title="Decompression Speed (ops/s)" valueKey="decompress" flip />
      <ComparisonTable
        title="Size of output in bytes (% of input)"
        valueKey="compressedLength"
        ratio
        // @ts-ignore
        getFileName={getSizeFileName}
      />
    </div>
  )
}

export default App
