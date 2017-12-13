export const enum CardsA {
  recieve = 'recieveCard',
  add = 'addCard',
}
export type CardsAT =
  { type: CardsA.recieve, cards: {} } |
  { type: CardsA.add, card: {} }

export function recieveCards(cards: any): CardsAT {
  return {
    type: CardsA.recieve,
    cards
  }
}
export function addCard(card: {}): CardsAT {
  return {
    type: CardsA.add,
    card
  }
}
