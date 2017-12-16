import React from 'react'
import {
  ListAllFlashCards,
  AddFlashCardForm,
  ListAllSeries,
  ListAllCategories
} from '../Components'
import { Text } from 'native-base'
import { BaseContainer } from './'
import { Icon, Fab, View, Button, Container, Header } from 'native-base'
import { NavigationScreenConfigProps } from 'react-navigation'

export const ListFlashCards = ({navigation}: NavigationScreenConfigProps) => (
  <Container>
    <Header />
    <View style={{ flex: 1 }}>
      <ListAllCategories  {...{navigation}} />
      <Fab
        active={true}
        direction="up"
        containerStyle={{}}
        style={{ backgroundColor: '#5067FF' }}
        position="bottomRight"
        onPress={() => navigation.navigate('AddCategory')}
      >
        <Icon name="add" />
      </Fab>
    </View>
  </Container>
)
export const AddFlashCard = (props: NavigationScreenConfigProps) => {
  return (
    <BaseContainer title={'Add Flashcard'}>
      <AddFlashCardForm  {...props} />
      <Text>Current cards:</Text>
      <ListAllFlashCards  {...props} />
    </BaseContainer>
  )
}
