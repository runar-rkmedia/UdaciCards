import { Card } from '../store'
import { CardsStoreState } from '../Reducers'

export const enum CardsA {
  recieve = 'recieveCard',
  add = 'addCard',
  remove = 'removeCard'
}
export type CardsAT =
  { type: CardsA.recieve, cards: CardsStoreState } |
  { type: CardsA.add, card: Card } |
  { type: CardsA.remove, cardId: string }

export function recieveCards(cards: {
  [s: string]: Card
}): CardsAT {
  return {
    type: CardsA.recieve,
    cards
  }
}
export function addCard(card: Card): CardsAT {
  return {
    type: CardsA.add,
    card
  }
}
export function removeCard(cardId: string): CardsAT {
  return {
    type: CardsA.remove,
    cardId
  }
}
