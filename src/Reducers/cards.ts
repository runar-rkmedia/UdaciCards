import { CardsA, CardsAT } from '../actions'
import { Card } from '../store'
import UUID from 'uuid'

export interface CardsStoreState {
  [s: string]: Card
}

const uuid = UUID.v1

export function cards(state: CardsStoreState = {}, action: CardsAT): CardsStoreState {
  console.log('hey, ', state, action)
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
    default:
      return state
  }
}
