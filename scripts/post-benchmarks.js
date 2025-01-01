import fs from 'fs'
const fsPromise = fs.promises

const dir = './public'


function combineData(dataObj, resultsArray) {
    const result = [];

    // Create a map of file names to objects containing item data
    const fileMap = {};
    for (const [method, files] of Object.entries(dataObj)) {
        for (const fileData of files) {
            const { file, ...rest } = fileData;
            if (!fileMap[file]) fileMap[file] = {};
            fileMap[file][method] = rest;
        }
    }

    // Process the resultsArray to add compress and decompress data
    for (const { name, results } of resultsArray) {
        const [action, file] = name.split('-');
        for (const { name: methodName, ops } of results) {
            if (fileMap[file] && fileMap[file][methodName]) {
                if (!fileMap[file][methodName][action]) {
                    fileMap[file][methodName][action] = { ops };
                }
            }
        }
    }

    // Transform the map into the desired output format
    for (const [file, methods] of Object.entries(fileMap)) {
        const items = Object.entries(methods).map(([name, data]) => ({
            name,
            ...data,
        }));
        result.push({ file, items });
    }

    return result;
}

async function run() {
  const cd = []

  const sizeData = await fsPromise.readFile(`${dir}/size/ratio.json`)
  const parsedSize = JSON.parse(sizeData);

  const names = Object.keys(parsedSize).map(k=>k);
  const keys = `export const chartKeys = ` + JSON.stringify(names)
  fs.writeFile('./chart-data/keys.js', keys, 'utf8', () => {})

//   Object.keys(parsedSize).forEach((k) => {
//     names.push(k)
//     parsedSize[k].forEach((item) => {
//       const foundIdx = cd.findIndex((f) => f.file === item.file)
//       if (foundIdx !== -1) {
//         cd[foundIdx][k] = {}
//       } else {
//       }
//     })
//   })

//   const a = {
//     'LZW-Map': [
//       { file: 'large', compressedLength: 88, ratio: 12 },
//       { file: 'medium', compressedLength: 157, ratio: 25 },
//     ],
//     Compatto: [
//       { file: 'large', compressedLength: 45, ratio: 32 },
//       { file: 'medium', compressedLength: 22, ratio: 54 },
//     ],
//   }
//   const ff = [
//     {
//       name: 'compress-large',
//       results: [
//         { name: 'LZW-Map', ops: 34.21 },
//         { name: 'Compatto', ops: 31.11 },
//       ],
//     },
//     {
//       name: 'decompress-large',
//       results: [
//         { name: 'LZW-Map', ops: 12 },
//         { name: 'Compatto', ops: 55 },
//       ],
//     },
//     {
//         name: 'compress-medium',
//         results: [
//           { name: 'LZW-Map', ops: 34 },
//           { name: 'Compatto', ops: 45 },
//         ],
//       },
//       {
//         name: 'decompress-medium',
//         results: [
//           { name: 'LZW-Map', ops: 22 },
//           { name: 'Compatto', ops: 345 },
//         ],
//       },
//   ]

//   const output = [
//     {
//       file: 'large',
//       items: [
//         { name: 'LZW-Map', compressedLength: 88, ratio: 12, compress: {ops: 34.21}, decompress: {ops: 12} },
//         { name: 'Compatto', compressedLength: 22, ratio: 25, compress: {ops: 31.11}, decompress: {ops: 55} },
//       ],
//     },
//     {
//         file: 'medium',
//         items: [
//             { name: 'LZW-Map',compressedLength: 157, ratio: 25, compress: {ops: 34}, decompress: {ops: 22} },
//             { name: 'Compatto', compressedLength: 22, ratio: 54 , compress: {ops: 45}, decompress: {ops: 345} },
//         ],
//       },
//   ]


  const files = await fsPromise.readdir(`${dir}/speed`)
  console.log('files', files)

//   const combined = combineData(sizeData, )

const speedData = [];
  for (const file of files) {
    const data = await fsPromise.readFile(`${dir}/speed/${file}`)
    const parsedSpeedData = JSON.parse(data);
    speedData.push(parsedSpeedData);
//     const [type, name] = parsedData.name.split('-')

//     parsedData.results.forEach((res) => {
//       const idx = parsedSize[res.name].findIndex((f) => f.file === name)
//       if (idx !== -1) {
//         parsedSize[res.name][idx][type] = res.ops
//       }
//     })
  }

  console.log('speedData', speedData)
const combined = combineData(parsedSize, speedData);


//   console.log('parsedSize', parsedSize)

  const str = `export const chartData = ` + JSON.stringify(combined)
  fs.writeFile('./chart-data/index.js', str, 'utf8', () => {})
}

run()

// async function run() {

//   const sizeData = await fsPromise.readFile(`${dir}/size/ratio.json`)
//   const parsedSize = JSON.parse(sizeData);

//   console.log('parsedSize', parsedSize)

//   const files = await fsPromise.readdir(`${dir}/speed`)
//   console.log('files', files)
//   for (const file of files) {
//     const data = await fsPromise.readFile(`${dir}/speed/${file}`)
//     const parsedData = JSON.parse(data);
//     const [type, name] = parsedData.name.split('-');
//     console.log('TYPE-NAME', {type, name});
//     parsedData.results.forEach((res)=>{
//         const idx = parsedSize[res.name].findIndex((f) => f.file === name);
//         if(idx !== -1){
//             parsedSize[res.name][idx][type] = res.ops;
//         }
//     })
//   }
//   console.log('parsedSize', parsedSize);

//   const str = `export const chartData = ` + JSON.stringify(parsedSize)
//   fs.writeFile('./chart-data/index.js', str, 'utf8', ()=>{})
// }

// run()
