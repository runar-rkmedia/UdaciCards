import { Serie } from '../store'
import { SerieStoreState } from '../Reducers'

export const enum SerieA {
  recieve = 'recievedSerie',
  add = 'adddSerie',
  remove = 'removedSerie'
}
export type SerieAT =
  { type: SerieA.recieve, series: SerieStoreState } |
  { type: SerieA.add, serie: Serie } |
  { type: SerieA.remove, serieId: string }

export function recieveSerie(series: {
  [s: string]: Serie
}): SerieAT {
  return {
    type: SerieA.recieve,
    series
  }
}
export function addSerie(serie: Serie): SerieAT {
  return {
    type: SerieA.add,
    serie
  }
}
export function removeSerie(serieId: string): SerieAT {
  return {
    type: SerieA.remove,
    serieId
  }
}
