import React from 'react'
import { Text, Card, DeckSwiper, Body, CardItem, H1, H2, Button, View } from 'native-base'
import { FlashOption } from '../Components'
import { connect, Dispatch } from 'react-redux'
import { setUserAnswer } from '../actions'
import { getUserScore } from '../utils'
import { color } from '../Style'
import { NavigationScreenConfigProps } from 'react-navigation'
import { Serie, StoreState, Card as CardI, CardOptions } from '../store'

interface Props {
  serie: Serie
}

interface State {
  answers: {
    [s: string]: any
  }
  completed: boolean
}

const initialState: State = {
  answers: {},
  completed: false
}

class QuizViewC extends React.Component<IConnectProps, State> {
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
    const { question, options, points } = card
    const index = cards.indexOf(card)
    const answerGiven = answers[card.id]
    let answeredCorrectly = false
    let correctAnswers: string[] = []
    const answeredAll = cards.length === Object.keys(answers).length
    return (
      <Card style={{ elevation: 3 }}>
        <CardItem header={true}>
          <Text>{`${index + 1}/${cards.length}: ${question}`}</Text>
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
        {answeredAll && this.renderFinished()}
      </Card>
    )
  }
  renderFinished = () => {
    const { serie, navigation, userAnswer, cards } = this.props
    const [points, sum, count, totalCount] = getUserScore(userAnswer, cards)
    return (
      <View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        />
        <View
          style={[
            {
              margin: 20,
              padding: 20,
              paddingBottom: 60,
              backgroundColor: color.white
            }
          ]}
        >
          <H1>"{serie.displayText}"-quiz completed</H1>
          <H2>{`You got ${points} points out of ${sum} possible.`}</H2>
          <H2>{`You answered ${count} questions correctly out of ${totalCount}.`}</H2>
          <Button
            onPress={() => navigation.goBack()}
          >
            <Text>Go back</Text>
          </Button>
        </View>
      </View>
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
    const { completed } = this.state
    if (completed) {
      return this.renderFinished()
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
  ({ cards, userAnswer }: StoreState, { serie }: Props) => {
    return {
      userAnswer,
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
type IConnectProps = typeof connectCreator.allProps & Props & NavigationScreenConfigProps
export const QuizView = connectCreator(QuizViewC)
