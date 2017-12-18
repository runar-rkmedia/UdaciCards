import React from 'react'
import { View, Text, Card, DeckSwiper, Left, Body, CardItem, Button } from 'native-base'
import { Serie } from '../store'
import { connect } from 'react-redux'
import { StoreState, Card as CardI } from '../store'

interface Props {
  serie: Serie
}

interface State {
  answers: {
    [s: string]: any
  }
}

const initialState: State = {
  answers: {}
}

export class SerieViewC extends React.Component<Props & IConnectProps, State> {
  state = initialState
  answer = (cardID: string, value: any) => {
    this.setState((state): State => ({
      ...state,
      answers: {
        ...state.answers,
        [cardID]: value
      }
    }))
  }
  render() {
    const { serie, cards } = this.props
    const { answers } = this.state
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
          dataSource={cards}
          renderItem={(card: CardI) => {
            const { question, numeral, options } = card
            const index = cards.indexOf(card)
            const alreadyAnswered = answers[card.id]
            return (
              <Card style={{ elevation: 3 }}>
                <CardItem>
                  <Left>
                    <Body>
                      <Text>{`${index + 1}/${cards.length}: ${question}`}</Text>
                      <Text note={true}>{numeral ? 'How much...' : options ? 'What...' : null}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem>
                  {options && options.map((option, i) => {
                    const answeredThisOption = alreadyAnswered === option.displayText
                    console.log(alreadyAnswered, answeredThisOption, answers)
                    return (
                    <Button
                      light={!answeredThisOption}
                      primary={option.correct}
                      success={answeredThisOption && option.correct}
                      warning={answeredThisOption && !option.correct}
                      info={!alreadyAnswered}
                      key={i}
                      onPress={() => this.answer(card.id, option.displayText)}
                    >
                      <Text>{option.displayText}</Text>
                    </Button>
                  )})}
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
      cards: serie && Object.keys(cards)
        .map(key => cards[key])
        .filter(card => card.seriesId === serie.id)
    }
  },
)
type IConnectProps = typeof connectCreator.allProps
export const SerieView = connectCreator(SerieViewC)
