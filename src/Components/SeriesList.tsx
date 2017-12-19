import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { connect, Dispatch } from 'react-redux'
import { removeSerie } from '../actions'
import { Text, ListItem, Left, Right, Body, Button, Icon, View } from 'native-base'
import { Serie, StoreState } from '../store'
import { iconOS } from '../utils'

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
    const { left, right, onPress, cards } = this.props
    const itemCards = cards.filter(card => card.seriesId === id)
    const numCards = itemCards.length
    const sumOfPoints = itemCards.reduce(
      (sum, card) => {
        return sum + card.points
      },
      0)
    return (
      <ListItem
        icon={true}
      >
        <Left>
          {left ? left : (
            <Icon name={iconOS('star-outline')} />
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
            <Text>0/{sumOfPoints} Points</Text>
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
  ({ cards }: StoreState, ownProps: Props) => {
    return {
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
