import { CardsA, CardsAT } from '../actions'
import { Card } from '../store'
import UUID from 'uuid'

export interface CardsStoreState {
  [s: string]: Card
}

const uuid = UUID.v1

export const cards = (state: CardsStoreState = {}, action: CardsAT) => {
  switch (action.type) {
    case CardsA.recieve:
      return {
        ...state,
        ...action.cards
      }
    case CardsA.add:
      return {
        ...state,
        [uuid()]: action.card
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
