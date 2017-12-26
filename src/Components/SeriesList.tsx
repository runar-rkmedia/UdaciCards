import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { connect, Dispatch } from 'react-redux'
import { removeSerie } from '../actions'
import { Text, ListItem, Left, Right, Body, Button, Icon, View } from 'native-base'
import { Serie, StoreState } from '../store'
import { iconOS, getUserScore } from '../utils'

interface Props {
  series: {
    [s: string]: Serie
  }
  left?: any
  right?: any
  onPress: (id: string) => any
}

export class SeriesListC extends Component<Props & IConnectProps> {
  deleteRow(serieId: string) {
    this.props.removeSerie(serieId)
  }

  renderSerie = ({ item }: { item: Serie }) => {
    const { displayText, id } = item
    const { left, right, onPress, cards, userAnswer } = this.props
    const itemCards = cards.filter(card => card.seriesId === id)
    const numCards = itemCards.length
    const [userPoints, sumOfPoints] = getUserScore(userAnswer, itemCards)
    return (
      <ListItem
        icon={true}
      >
        <Left>
          {left ? left : (
            <Icon name={userPoints === sumOfPoints ? iconOS('star') : iconOS('star-outline')} />
          )}
        </Left>
        <Body>
          <Button
            transparent={true}
            onPress={() => onPress(id)}
          >
            <Text>{displayText} – {numCards} Cards</Text>
          </Button>
        </Body>
        <Right>
          {right ? right : (
            <Text>{`${userPoints}/${sumOfPoints} Points`}</Text>
          )}
        </Right>
      </ListItem>
    )
  }
  render() {
    const { series } = this.props
    return (
      <View>
        <FlatList
          keyExtractor={item => item.id}
          data={Object.keys(series).map(
            (id): Serie => ({
              ...series[id],
            }))}
          renderItem={this.renderSerie}

        />
      </View>
    )
  }
}
const connectCreator = connect(
  ({ cards, userAnswer}: StoreState, ownProps: Props) => {
    return {
      userAnswer,
      cards: Object.keys(cards).map(key => cards[key])
    }
  },
  (dispatch: Dispatch<{}>) => {
    return {
      removeSerie: (serieId: string) => dispatch((removeSerie(serieId))),
    }
  },
)
type IConnectProps = typeof connectCreator.allProps
export const SeriesList = connectCreator(SeriesListC)
