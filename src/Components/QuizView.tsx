import React from 'react'
import { View, Text, Card, DeckSwiper, Body, CardItem } from 'native-base'
import { FlashOption } from '../Components'
import { connect, Dispatch } from 'react-redux'
import { setUserAnswer } from '../actions'
import { Serie, StoreState, Card as CardI, CardOptions } from '../store'

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

class QuizViewC extends React.Component<Props & IConnectProps, State> {
  state = initialState
  answer = (cardID: string, option: CardOptions) => {
    this.props.setUserAnswer(this.props.cardsHash[cardID], option.correct)
    this.setState((state): State => ({
      ...state,
      answers: {
        ...state.answers,
        [cardID]: option.displayText
      }
    }))
  }
  renderCard = (card: CardI) => {
    const { cards } = this.props
    const { answers } = this.state
    const { question, numeral, options, points } = card
    const index = cards.indexOf(card)
    const answerGiven = answers[card.id]
    let answeredCorrectly = false
    let correctAnswers: string[] = []
    return (
      <Card style={{ elevation: 3 }}>
        <CardItem header={true}>
          <Text>{`${index + 1}/${cards.length}: ${question}`}</Text>
          <Text note={true}>{numeral ? 'How much...' : options ? 'What...' : null}</Text>
        </CardItem>
        <CardItem>
          <Body>
            {options && options.map((option, i) => {
              const answeredThisOption = answerGiven === option.displayText
              if (option.correct) {
                correctAnswers.push(option.displayText)
                if (answeredThisOption) {
                  answeredCorrectly = true
                }
              }
              return (
                <FlashOption
                  key={i}
                  onAnswer={(cardId, value) => (this.answer(cardId, option))}
                  {...{
                    card, option, answerGiven, answeredThisOption
                  }}
                />
              )
            })}
          </Body>
        </CardItem>
        <CardItem footer={true}>
          {answerGiven && (
            answeredCorrectly ? (
              <Text>
                Hurray, you answered correctly and got {points} points.
                                    </Text>
            )
              : (
                <Text>
                  Nope, that is not correct. The correct answer was
                                      <Text style={{ fontWeight: 'bold' }}> {correctAnswers.join(', ')}</Text>
                </Text>
              )
          )}
        </CardItem>
      </Card>
    )
  }
  render() {
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
          dataSource={cards}
          renderItem={this.renderCard}
        />
      </View>
    )
  }
}

const connectCreator = connect(
  ({ cards }: StoreState, { serie }: Props) => {
    return {
      cardsHash: cards,
      cards: serie && Object.keys(cards)
        .map(key => cards[key])
        .filter(card => card.seriesId === serie.id)
    }
  },
  (dispatch: Dispatch<{}>) => {
    return {
      setUserAnswer: (answerCard: CardI, correct: boolean) => dispatch(setUserAnswer(answerCard, correct))
    }
  },
)
type IConnectProps = typeof connectCreator.allProps
export const QuizView = connectCreator(QuizViewC)
