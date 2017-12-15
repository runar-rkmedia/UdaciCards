import React from 'react'
import { connect } from 'react-redux'
import { StoreState } from '../store'
import { FlashCardList } from '../Components'
import {} from 'native-base'

const ListAllFlashCardsC = ({cards}: IConnectProps) => (
  <FlashCardList cards={cards} />
)
const connectCreator = connect(
  ({ cards }: StoreState) => {
    return {
      cards
    }
  }
)
type IConnectProps = typeof connectCreator.allProps
export const ListAllFlashCards = connectCreator(ListAllFlashCardsC)
