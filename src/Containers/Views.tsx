import React from 'react'
import { ListAllFlashCards, AddFlashCardForm } from '../Components'
import { Text } from 'native-base'
import { BaseContainer } from './'

export const ListFlashCards = () => (
  <BaseContainer title={'List of Cards'}>
    <ListAllFlashCards />
  </BaseContainer>
)
export const AddFlashCard = () => (
  <BaseContainer title={'Add Flashcard'}>
    <AddFlashCardForm />
    <Text>Current cards:</Text>
    <ListAllFlashCards />
  </BaseContainer>
)
