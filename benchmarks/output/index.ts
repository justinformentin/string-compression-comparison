import fs from 'fs'
import { funcs } from '../shared/funcs.js'
import { lexicalMinified } from '../../data/lexical_minified.js'

function run() {
  const res = funcs.map((func) => {
    const compressed = func.encode(lexicalMinified)
    return {
      title: func.title,
      output: compressed,
    }
  })
  const json = JSON.stringify(res);
  console.log('json', json)
  fs.writeFile('./output/output-examples/lexical_minified.json', json, 'utf8', (err) => {
    console.log('err', err)
    process.exit()
  })
}
run()
