export const computeColor = (factor: number /* 1 to 4 */) => {
  if (factor < 3.0) {
    const a = factor - 1.0
    const r = (1.0 - a) * 99 + a * 255
    const g = (1.0 - a) * 191 + a * 236
    const b = (1.0 - a) * 124 + a * 132
    return `rgb(${r.toFixed(0)}, ${g.toFixed(0)}, ${b.toFixed(0)})`
  } else {
    const a = Math.min((factor - 2.0) / 2.0, 1.0)
    const r = (1.0 - a) * 255 + a * 249
    const g = (1.0 - a) * 236 + a * 105
    const b = (1.0 - a) * 132 + a * 108
    return `rgb(${r.toFixed(0)}, ${g.toFixed(0)}, ${b.toFixed(0)})`
  }
}
