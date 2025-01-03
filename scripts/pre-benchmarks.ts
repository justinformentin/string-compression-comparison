import fs from 'fs'

const dir = "./data"

async function createFileData() {
  const files = await fs.promises.readdir(dir)

  const fileSizes = {}
  const data: {title: string, source: string}[] = []

  for (const file of files) {
    const filePath = `${dir}/${file}`;
    const [fileName] = file.split('.')
    const { size } = await fs.promises.stat(filePath)
    fileSizes[fileName] = (size / 1000).toFixed() + 'kb';

    const fileContents = await fs.promises.readFile(filePath, 'utf8')
    data.push({title: fileName, source: fileContents});
   }

  const fileSizeStr = `export const fileSizes = ` + JSON.stringify(fileSizes, null, 4)
  await fs.promises.writeFile('./chart-data/file-sizes-2.ts', fileSizeStr, 'utf8')
  
  const fileContentsStr = 'export const data = ' + JSON.stringify(data, null, 4);
  await fs.promises.writeFile('./benchmarks/shared/data.ts', fileContentsStr, 'utf8')
   process.exit();
}

createFileData()