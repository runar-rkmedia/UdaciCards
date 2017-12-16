import React from 'react'
import { ListAllFlashCards, AddFlashCardForm, ListAllSeries } from '../Components'
import { Text } from 'native-base'
import { BaseContainer } from './'

export const ListFlashCards = (props: any) => (
  <BaseContainer title={'List of Cards'}>
    <ListAllFlashCards  {...props}/>
  </BaseContainer>
)
export const AddFlashCard = (props: any) => {
  return (
  <BaseContainer title={'Add Flashcard'}>
    <AddFlashCardForm  {...props}/>
    <Text>Current cards:</Text>
    <ListAllFlashCards  {...props}/>
  </BaseContainer>
)}
