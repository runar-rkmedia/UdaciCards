import React, { Component } from 'react'
import { FlatList } from 'react-native'
import {
  Container,
  Header, Content, Body, Title, Text, SwipeRow, Button, Icon, View
} from 'native-base'
import { Card } from '../store'

interface KeyedCard extends Card {
  key: string
}

export class ListFlashCardsC extends Component<IConnectProps> {
  deleteRow(cardId: string) {
    this.props.removeCard(cardId)
  }
  renderCard = ({ item }: { item: KeyedCard }) => {
    const { question, key } = item
    return (
      <SwipeRow
        key={key}
        leftOpenValue={75}
        rightOpenValue={-75}
        left={
          <Button success={true} onPress={() => alert('Add')}>
            <Icon active={true} name="add" />
          </Button>}
        body={
          <View>
            <Text>{question}</Text>
          </View>}
        right={
          (<Button danger={true} onPress={() => this.deleteRow(key)}>
            <Icon active={true} name="trash" />
          </Button>)}
      />
    )
  }

  render() {
    const { cards } = this.props
    return (
      <Container>
        <Header >
          <Body>
            <Title>List of cards</Title>
          </Body>
        </Header>
        <Content>
          <FlatList
            data={Object.keys(cards).map(
              (key): KeyedCard => ({
                ...cards[key],
                key,
              }))}
            renderItem={this.renderCard}
          />
        </Content>
      </Container >
    )
  }
}
import { connect, Dispatch } from 'react-redux'
import { StoreState } from '../store'
import { removeCard } from '../actions'
const connectCreator = connect(
  ({ cards }: StoreState) => {
    return {
      cards
    }
  },
  (dispatch: Dispatch<{}>) => {
    return {
      removeCard: (cardId: string) => dispatch((removeCard(cardId))),
    }
  },
)
type IConnectProps = typeof connectCreator.allProps
export const ListFlashCards = connectCreator(ListFlashCardsC)
