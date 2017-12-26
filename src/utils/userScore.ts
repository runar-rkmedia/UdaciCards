import { UserAnswerStoreState } from '../Reducers'
import { Card } from '../store'

export const getUserScore = (userAnswer: UserAnswerStoreState, cards: Card[]) => {
  let points = 0
  let sum = 0
  for (let i = cards.length - 1; i >= 0; i -= 1) {
    const card = cards[i]
    sum += card.points
    points += card.id in userAnswer ? card.points : 0
  }
  return [points, sum]
}
