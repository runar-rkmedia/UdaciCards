export * from './cards'
export * from './category'
export * from './series'
export * from './userAnswer'
import { cards } from './cards'
import { categories } from './category'
import { series } from './series'
import { userAnswer } from './userAnswer'

export const reducers = { cards, categories, series, userAnswer }
