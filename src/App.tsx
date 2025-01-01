import { fileSizes } from '../chart-data/file-sizes'
import { ComparisonTable } from './components/comparison-table'
import { LibSizesTable } from './components/lib-size-table'

function App() {
  const getSizeFileName = (n: keyof typeof fileSizes) => `${n} (${fileSizes?.[n]})`

  return (
    <div className="pb-8">
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
        title="Size of output in bytes (% of input)"
        getValue={(item) => item.compressedLength}
        ratio
        // @ts-ignore
        getFileName={getSizeFileName}
      />
    </div>
  )
}

export default App
