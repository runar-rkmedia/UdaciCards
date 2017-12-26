import { createStore } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import {
  reducers, CardsStoreState, SerieStoreState, CategoryStoreState, UserAnswerStoreState
} from '../Reducers/'
import { composeWithDevTools } from 'remote-redux-devtools'

const config = {
  key: 'root',
  storage,
}

const reducer = persistCombineReducers(config, reducers)
export const store = createStore(reducer, composeWithDevTools())
export const persistor = persistStore(store)

export enum CardTypes {
  slider = 1,
  options
}

export interface CardOptions {
  displayText: string
  correct: boolean
}

export interface CardNumeral {
  min: number
  max: number
  step: number
  correct: number
}

export interface Card {
  id: string
  seriesId: string
  points: number
  date: number
  question: string
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
// UserAnswers is a hashtable of CardIDs, with the value being the answer given
export type UserAnswer = {
  [s: string]: string
}
export interface StoreState {
  cards: CardsStoreState
  series: SerieStoreState,
  categories: CategoryStoreState
  userAnswer: UserAnswerStoreState
}
