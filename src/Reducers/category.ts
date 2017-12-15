import { CategoryA, CategoryAT } from '../actions'
import { Category } from '../store'
import UUID from 'uuid'

export interface CategoryStoreState {
  [s: string]: Category
}

const uuid = UUID.v1

export const categories = (state: CategoryStoreState = {}, action: CategoryAT) => {
  switch (action.type) {
    case CategoryA.recieve:
      return {
        ...state,
        ...action.categories
      }
    case CategoryA.add:
      return {
        ...state,
        [uuid()]: action.category
      }
    case CategoryA.remove:
      let items = { ...state }
      if (items.hasOwnProperty(action.categoryId)) {
        delete items[action.categoryId]
      }
      return {
        ...items
      }
    default:
      return state
  }
}
