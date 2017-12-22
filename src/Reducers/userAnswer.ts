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
      const seriesId = action.answerCard.seriesId
      const cardId = action.answerCard.id
      return {
        ...state,
        [seriesId]: {
          ...state[seriesId],
          [cardId]: action.correct || undefined
        }
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
