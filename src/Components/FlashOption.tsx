import React from 'react'
import { Button, Icon, Text } from 'native-base'
import { Card, CardOptions } from '../store'
import { color } from '../Style'

interface Props {
  card: Card
  option: CardOptions
  answerGiven: boolean
  answeredThisOption: boolean
  onAnswer: (cardId: string, optionId: string) => any
}

export class FlashOption extends React.Component<Props> {
  setStatusOfButton = (answerGiven: boolean, answeredThisOption: boolean, correct: boolean) => {
    let status: {
      light?: boolean,
      primary?: boolean,
      success?: boolean
      warning?: boolean
      info?: boolean
      bordered?: boolean
    } = {
        bordered: true,
        info: true
      }
    if (answerGiven) {
      status = {
        bordered: false,
        info: false,
        primary: !answeredThisOption && correct,
        light: !answeredThisOption && !correct,
        success: answeredThisOption && correct,
        warning: answeredThisOption && !correct,
      }
    }
    return status
  }
  render() {
    const { answerGiven, answeredThisOption, option, onAnswer, card } = this.props
    return (
      <Button
        iconRight={answerGiven}
        full={true}
        rounded={true}
        style={{ marginBottom: 10 }}
        {...this.setStatusOfButton(
          answerGiven, answeredThisOption, option.correct) }
        onPress={() => !answerGiven && onAnswer(card.id, option.displayText)
        }
      >
        <Text>{option.displayText}</Text>
        {answerGiven && (option.correct ? (
          <Icon
            name="checkmark"
            style={{ fontSize: 24, color: color.white }}
          />
        ) : (
            <Icon
              name="close"
              style={{ fontSize: 24, color: answeredThisOption ? color.white : color.red }}
            />
          ))}
      </Button>
    )
  }
}
