import { complete, configure, cycle, save } from 'benny'

export const handlers = (fileName) => {
  return [
    configure({
      minDisplayPrecision: 2,
    }),
    cycle((currentResult, summary) => {
      /* your custom cycle handling goes here */
    }),
    complete((summary) => {
      /* your custom complete handling goes here */
    }),
    // save({
    //     file: fileName,
    //     folder: 'output/speed',
    //     version: '1.0.0',
    //     details: true,
    //     format: 'chart.html',
    //   }),
      // save({
      //   file: fileName,
      //   folder: 'public',
      //   version: '1.0.0',
      //   details: true,
      //   format: 'table.html',
      // }),
      save({
        file: fileName,
        folder: 'output/speed',
        version: '1.0.0',
      }),
  ]
}