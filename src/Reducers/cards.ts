import { CardsA, CardsAT } from '../actions'
import { Cards } from '../store'

interface CardsStoreState {
  [s: string]: Cards
}

export function cards(state: CardsStoreState = {}, action: CardsAT): CardsStoreState {
  switch (action.type) {
    case CardsA.recieve:
      return {
        ...state,
        ...action.cards
      }
    case CardsA.add:
      return {
        ...state,
        ...action.card
      }
    default:
      return state
  }
}
