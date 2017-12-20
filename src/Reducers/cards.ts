import { CardsA, CardsAT } from '../actions'
import { Card } from '../store'
import { uuid } from '../utils'

export interface CardsStoreState {
  [s: string]: Card
}

export const cards = (state: CardsStoreState = {}, action: CardsAT) => {
  switch (action.type) {
    case CardsA.recieve:
      return {
        ...state,
        ...action.cards
      }
    case CardsA.add:
      const id = uuid()
      return {
        ...state,
        [id]: {
          ...action.card,
          id,
        }
      }
    case CardsA.remove:
      let items = { ...state }
      if (items.hasOwnProperty(action.cardId)) {
        delete items[action.cardId]
      }
      return {
        ...items
      }
    default:
      return state
  }
}
