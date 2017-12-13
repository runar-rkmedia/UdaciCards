import { createStore } from 'redux'
import { reducer } from '../Reducers/'
import { composeWithDevTools } from 'remote-redux-devtools'

export const store = createStore(reducer, composeWithDevTools())

type CardValue = string | number

interface CardOptions {
  displayText: string
  value: CardValue
}

interface CardNumeral {
  displayText: string
  type: 'slider' | 'stepper'
  value: CardValue
}

export interface Cards {
  date: number,
  question: string,
  answer: CardValue
  options?: CardOptions[]
  numeral?: CardNumeral[]
}

export interface StoreState {
  cards: {
    [s: string]: Cards
  }
}
