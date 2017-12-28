import React from 'react'
import { Content, Text, Card, Body, CardItem, Button, Left, Right, Icon } from 'native-base'
import { connect } from 'react-redux'
import { getUserScore } from '../utils'
import { Serie, StoreState } from '../store'
import { NavigationScreenConfigProps } from 'react-navigation'
import { MyStack } from '../Containers'
interface Props {
  serie: Serie
}

export class SerieEntryC extends React.Component<IConnectProps> {

  render() {
    const { cards, userAnswer, navigation, serie } = this.props
    const { displayText } = serie
    const [points, sum] = getUserScore(userAnswer, cards)
    return (
      <Content >
        <Card>
          <CardItem header={true}>
            <Text>{displayText}</Text>
          </CardItem>
          <CardItem>
            {!!cards.length ? (
              <Body>
                <Text>{cards.length} Cards, {sum} points.</Text>
                <Text>
                  {points === sum ?
                    `You have answered all of these questions correctly, congratulations!` :
                    `You currently have ${points} points for this serie.`}
                </Text>
              </Body>
            ) : (
                <Body>
                  <Text>No cards created for this serie, yet. Why don't you create the first one?</Text>
                </Body>
              )}

          </CardItem>
          <CardItem footer={true}>
            <Left>
              <Button
                bordered={true}
                iconLeft={true}
                onPress={() => navigation.navigate(MyStack.AddFlashCard, { serie })}
              >
                <Icon name="add" />
                <Text>Add a Card</Text>
              </Button>
            </Left>
            {!!cards.length && (
              <Right>
                <Button
                  iconLeft={true}
                  onPress={() => navigation.navigate(MyStack.QuizView, { serie })}
                >
                  <Icon name="flash" />
                  <Text>Start a quiz</Text>
                </Button>
              </Right>
            )}
          </CardItem>
        </Card>
      </Content>
    )
  }
}

const connectCreator = connect(
  ({ userAnswer, cards }: StoreState, ownProps: Props) => {
    const { id } = ownProps.serie
    return {
      userAnswer,
      cards: Object.keys(cards)
        .map(k => cards[k])
        .filter(card => card.seriesId === id)
    }
  },
)
type IConnectProps = typeof connectCreator.allProps & Props & NavigationScreenConfigProps
export const SerieEntry = connectCreator(SerieEntryC)
