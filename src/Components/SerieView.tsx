import React from 'react'
import { View, Text, Card, DeckSwiper, Left, Body, CardItem, Icon } from 'native-base'
import { Serie } from '../store'
import { connect } from 'react-redux'
import { StoreState, Card as CardI } from '../store'

interface Props {
  serie: Serie
}

export class SerieViewC extends React.Component<Props & IConnectProps> {
  render() {
    console.log('series', this.props)
    const { serie, cards } = this.props
    if (!serie) {
      return (
        <View>
          <Text>Could not find this serie.</Text>
        </View>
      )
    }
    return (
      <View>
        <DeckSwiper
          dataSource={Object.keys(cards).map(key => cards[key])}
          renderItem={(card: CardI) => {
            const { question, numeral, options, answer } = card
            console.log(card )
            return (
              <Card style={{ elevation: 3 }}>
                <CardItem>
                  <Left>
                    <Body>
                      <Text>{question}</Text>
                      <Text note={true}>{numeral ? 'How much...' : options ? 'What...' : null}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody={true}>
                  <Text>Show buttons here</Text>
                </CardItem>
                <CardItem>
                  <Icon name="heart" style={{ color: '#ED4A6A' }} />
                  <Text>({answer})</Text>
                </CardItem>
              </Card>
            )
          }

          }
        />
      </View>
    )
  }
}

const connectCreator = connect(
  ({ cards }: StoreState, { serie }: Props) => {
    return {
      cards: serie && Object.keys(cards).reduce(
        (x, key) => {
          const card = cards[key]
          if (card.seriesId === serie.id) {
            return { ...x, card }
          }
          return x
        },
        {})
    }
  },
)
type IConnectProps = typeof connectCreator.allProps
export const SerieView = connectCreator(SerieViewC)
