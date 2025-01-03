import fs from 'fs'
import { funcs } from '../shared/funcs.js'
import { data } from '../shared/data.js'

function run() {
  const res = funcs.map((func) => {
    const compressed = func.encode(data.find((d) => d.title === 'tiny')!.source)
    return {
      title: func.title,
      output: compressed,
    }
  })
  const json = JSON.stringify(res)
  console.log('json', json)
  fs.writeFile('./output/output-examples/tiny.json', json, 'utf8', (err) => {
    console.log('err', err)
    process.exit()
  })
}
run()
