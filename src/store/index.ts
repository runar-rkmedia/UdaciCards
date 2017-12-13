import { createStore } from 'redux'
import { reducer } from '../Reducers/'
import { composeWithDevTools } from 'remote-redux-devtools'

export const store = createStore(reducer, composeWithDevTools())

type CardValue = string | number

export enum CardTypes {
  slider, stepper
}

interface CardOptions {
  displayText: string
  value: CardValue
}

interface CardNumeral {
  displayText: string
  type: CardTypes
  min: number
  max: number
  step: number
}

export interface Card {
  date: number,
  question: string,
  answer: CardValue
  options?: CardOptions[]
  numeral?: CardNumeral
}

export interface StoreState {
  cards: {
    [s: string]: Card
  }
}
