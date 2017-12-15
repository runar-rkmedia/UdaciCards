import { Category } from '../store'
import { CategoryStoreState } from '../Reducers'

export const enum CategoryA {
  recieve = 'recievedCategory',
  add = 'adddCategory',
  remove = 'removedCategory'
}
export type CategoryAT =
  { type: CategoryA.recieve, categories: CategoryStoreState } |
  { type: CategoryA.add, category: Category } |
  { type: CategoryA.remove, categoryId: string }

export function recieveCategory(categories: any): CategoryAT {
  return {
    type: CategoryA.recieve,
    categories
  }
}
export function addCategory(category: Category): CategoryAT {
  return {
    type: CategoryA.add,
    category
  }
}
export function removeCategory(categoryId: string): CategoryAT {
  return {
    type: CategoryA.remove,
    categoryId
  }
}
