import React from 'react'
import {
  AddFlashCardForm,
  ListAllCategories
} from '../Components'
import {
  View
} from 'native-base'
import { NavigationScreenConfigProps } from 'react-navigation'

export const ListFlashCards = (props: NavigationScreenConfigProps) => (
  <View style={{ flex: 1 }}>
    <ListAllCategories  {...props} />
  </View>
)
export const AddFlashCard = (props: NavigationScreenConfigProps) => {
  return (
    <AddFlashCardForm  {...props} />
  )
}
