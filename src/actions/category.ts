import { Category } from '../store'
import { CategoryStoreState } from '../Reducers'

export const enum CategoryA {
  recieve = 'recievedCategory',
  add = 'addCategory',
  edit = 'editCategory',
  remove = 'removedCategory'
}
export type CategoryAT =
  { type: CategoryA.recieve, categories: CategoryStoreState } |
  { type: CategoryA.add, displayText: string } |
  { type: CategoryA.edit, category: Category } |
  { type: CategoryA.remove, categoryId: string }

export function recieveCategory(categories: any): CategoryAT {
  return {
    type: CategoryA.recieve,
    categories
  }
}
export function addCategory(displayText: string): CategoryAT {
  return {
    type: CategoryA.add,
    displayText
  }
}
export function editCategory(category: Category): CategoryAT {
  return {
    type: CategoryA.edit,
    category
  }
}
export function removeCategory(categoryId: string): CategoryAT {
  return {
    type: CategoryA.remove,
    categoryId
  }
}
