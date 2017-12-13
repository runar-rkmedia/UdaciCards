import { Card } from '../store'
import { CardsStoreState } from '../Reducers'

export const enum CardsA {
  recieve = 'recieveCard',
  add = 'addCard',
}
export type CardsAT =
  { type: CardsA.recieve, cards: CardsStoreState } |
  { type: CardsA.add, card: Card }

export function recieveCards(cards: any): CardsAT {
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
