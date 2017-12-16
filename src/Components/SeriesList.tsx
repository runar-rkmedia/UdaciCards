import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { connect, Dispatch } from 'react-redux'
import { removeSerie } from '../actions'
import {
  Text, SwipeRow, Button, Icon
} from 'native-base'
import { Serie } from '../store'

interface KeyedSerie extends Serie {
  key: string
}

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
  renderSerie = ({ item }: { item: KeyedSerie }) => {
    const { displayText, key } = item
    const { left, right, onPress } = this.props
    return (
      <SwipeRow
        key={key}
        leftOpenValue={left ? 75 : 0}
        rightOpenValue={right === undefined ? -75 : 0}
        left={left}
        body={
          <Button
            transparent={true}
            onPress={() => onPress(key)}
          >
            <Text>{displayText}</Text>
          </Button>
        }
        right={right ||
          (<Button danger={true} onPress={() => this.deleteRow(key)}>
            <Icon active={true} name="trash" />
          </Button>)}
      />
    )
  }
  render() {
    const { series } = this.props
    return (
      <FlatList
        data={Object.keys(series).map(
          (key): KeyedSerie => ({
            ...series[key],
            key,
          }))}
        renderItem={this.renderSerie}
      />
    )
  }
}
const connectCreator = connect(
  null,
  (dispatch: Dispatch<{}>) => {
    return {
      removeSerie: (serieId: string) => dispatch((removeSerie(serieId))),
    }
  },
)
type IConnectProps = typeof connectCreator.allProps
export const SeriesList = connectCreator(SeriesListC)
