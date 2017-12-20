import { CategoryA, CategoryAT } from '../actions'
import { Category } from '../store'
import { uuid } from '../utils'

export interface CategoryStoreState {
  [s: string]: Category
}


export const categories = (state: CategoryStoreState = {}, action: CategoryAT) => {
  switch (action.type) {
    case CategoryA.recieve:
      return {
        ...state,
        ...action.categories
      }
    case CategoryA.add:
      const id = uuid()
      return {
        ...state,
        [id]: {
          displayText: action.displayText,
          id,
        }
      }
    case CategoryA.edit:
      return {
        ...state,
        [action.category.id]: {
          ...action.category,
        }
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
