import { fileSizes } from '../chart-data/file-sizes'
import { ComparisonTable } from './components/comparison-table'
import { LibSizesTable } from './components/lib-size-table'

function App() {
  const getSizeFileName = (n: keyof typeof fileSizes) => `${n} (${fileSizes?.[n]})`

  return (
    <div className="overflow-auto px-8">
      <LibSizesTable />
      <ComparisonTable
        title="Compression Speed (ops/s)"
        getValue={(item) => item.compress.ops}
        flip
      />
      <ComparisonTable
        title="Decompression Speed (ops/s)"
        getValue={(item) => item.decompress.ops}
        flip
      />
      <ComparisonTable
        title="Size (in bytes)"
        // @ts-ignore
        getFileName={getSizeFileName}
        getValue={(item) => item.compressedLength}
      />
    </div>
  )
}

export default App
