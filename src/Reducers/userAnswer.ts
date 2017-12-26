import { UserAnswerA, UserAnswerAT } from '../actions'
import { UserAnswer } from '../store'

export interface UserAnswerStoreState {
  [s: string]: UserAnswer
}

export const userAnswer = (state: UserAnswerStoreState = {}, action: UserAnswerAT) => {
  switch (action.type) {
    case UserAnswerA.recieve:
      return {
        ...state,
        ...action.answers
      }
    case UserAnswerA.set:
      const cardId = action.answerCard.id
      if (action.correct) {
        return {
          ...state,
          [cardId]: action.correct
        }
      }
      let s = { ...state }
      if (s.hasOwnProperty(action.answerCard.id)) {
        delete s[action.answerCard.id]
      }
      return {
        ...s
      }
    case UserAnswerA.remove:
      let items = { ...state }
      if (items.hasOwnProperty(action.answerId)) {
        delete items[action.answerId]
      }
      return {
        ...items
      }
    default:
      return state
  }
}
