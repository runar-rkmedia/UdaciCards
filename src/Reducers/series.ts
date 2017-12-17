import { SerieA, SerieAT } from '../actions'
import { Serie } from '../store'
import UUID from 'uuid'

export interface SerieStoreState {
  [s: string]: Serie
}

const uuid = UUID.v1

export const series = (state: SerieStoreState = {}, action: SerieAT) => {
  switch (action.type) {
    case SerieA.recieve:
      return {
        ...state,
        ...action.series
      }
    case SerieA.add:
      const id = uuid()
      return {
        ...state,
        [id]: {
          ...action.serie,
          id,
        }
      }
    case SerieA.remove:
      let items = { ...state }
      if (items.hasOwnProperty(action.serieId)) {
        delete items[action.serieId]
      }
      return {
        ...items
      }
    default:
      return state
  }
}
