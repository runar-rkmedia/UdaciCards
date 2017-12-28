import { UserAnswerStoreState } from '../Reducers'
import { Card } from '../store'

export const getUserScore = (userAnswer: UserAnswerStoreState, cards: Card[]) => {
  let points = 0
  let sum = 0
  let count = 0
  for (let i = cards.length - 1; i >= 0; i -= 1) {
    const card = cards[i]
    sum += card.points
    if (card.id in userAnswer) {
      points += card.points
      count += 1
    }
  }
  return [points, sum, count, cards.length]
}
