import { createStore } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import { cards, categories, series } from '../Reducers/'
import { composeWithDevTools } from 'remote-redux-devtools'

const config = {
  key: 'root',
  storage,
}

const reducer = persistCombineReducers(config, { cards, categories, series })
export const store = createStore(reducer, composeWithDevTools())
export const persistor = persistStore(store)

type CardValue = string | number

export enum CardTypes {
  slider, stepper
}

export interface CardOptions {
  displayText: string
  value: CardValue
}

export interface CardNumeral {
  displayText: string
  type: CardTypes
  min: number
  max: number
  step: number
}

export interface Card {
  id: string
  seriesId: string
  date: number
  question: string
  answer: CardValue
  options?: CardOptions[]
  numeral?: CardNumeral
}
export interface Category {
  id: string
  displayText: string
}
export interface Serie {
  id: string
  displayText: string
  categoryId: string
}

export interface StoreState {
  cards: {
    [s: string]: Card
  },
  series: {
    [s: string]: Serie
  },
  categories: {
    [s: string]: Category
  }
}
