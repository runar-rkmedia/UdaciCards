import { Card } from '../store'
import { UserAnswerStoreState } from '../Reducers'

export const enum UserAnswerA {
  recieve = 'recieveUserAnswers',
  set = 'addUserAnswer',
  remove = 'removeUserAnswer'
}
export type UserAnswerAT =
  { type: UserAnswerA.recieve, answers: UserAnswerStoreState } |
  { type: UserAnswerA.set, answerCard: Card, correct: boolean } |
  { type: UserAnswerA.remove, serieId: string, answerId: string }

export const recieveUserAnswer = (answers: UserAnswerStoreState): UserAnswerAT => ({
  type: UserAnswerA.recieve,
  answers
})
export const setUserAnswer = (answerCard: Card, correct: boolean): UserAnswerAT => ({
  type: UserAnswerA.set,
  answerCard, correct
})
export const removeUserAnswer = (serieId: string, answerId: string): UserAnswerAT => ({
  type: UserAnswerA.remove,
  serieId, answerId
})
