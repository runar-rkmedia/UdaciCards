export * from './cards'
import { combineReducers } from 'redux'
import { cards } from './cards'

export const reducer = combineReducers({
  cards: (cards as any)
})
