import { createStore } from 'redux'
import { cards } from '../Reducers/'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'

const config = {
  key: 'cards',
  storage: storage,
}
const reducer = persistCombineReducers(config, { cards })
export const store = createStore(reducer)
export const persistor = persistStore(store)

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
