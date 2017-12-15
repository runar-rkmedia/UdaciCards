import React, { Component } from 'react'
import { Form, Item, Input, Label, Picker, Button, Text, View } from 'native-base'
import { Card, CardTypes, CardNumeral } from '../store'
import { connect, Dispatch } from 'react-redux'
import { addCard } from '../actions'

interface State extends Card {
  type: CardTypes | null
}
class AddFlashCardFormC extends Component<IConnectProps, State> {
  state = {
    date: -1,
    question: '',
    answer: '',
    type: null,
    options: undefined,
    numeral: undefined
  }
  onChange = (field: string, value: any, subValue: '' | 'numeral' | 'options' = '') => {
    if (subValue) {
      return this.setState((state) => {
        const s = state[subValue]
        return ({
          ...state,
          [subValue]: ({
            ...s,
            [field]: value
          })
        } as any)
    })
  }
    return this.setState(({
  [field]: value
}) as any)
  }
onChangeType = (value: CardTypes) => {
  switch (value) {
    case CardTypes.stepper:
      return this.setState(state => ({
        numeral: {
          displayText: 'Slider',
          type: value,
          ...state.numeral
        }
      }))
    case CardTypes.slider:
      return this.setState(state => ({
        numeral: {
          displayText: 'Slider',
          type: value,
          ...state.numeral
        }
      }))
    default:
      return
  }
}
submit = () => {
  const { question, answer, options, numeral } = this.state
  this.props.addCard({
    date: Date.now(),
    question, answer, options, numeral
  })
}

renderNumeral = (numeral: CardNumeral) => {
  const onChange = (key: string, e: any) => this.onChange(key, e.nativeEvent.text, 'numeral')
  return (
    <View>
      <Item floatingLabel={true}>
        <Label>Step</Label>
        <Input
          value={numeral.step}
          onChange={(e: any) => onChange('step', e)}
        />
      </Item>
      <Item floatingLabel={true}>
        <Label>Min</Label>
        <Input
          value={numeral.min}
          onChange={(e: any) => onChange('min', e)}
        />
      </Item>
      <Item floatingLabel={true}>
        <Label>Max</Label>
        <Input
          value={numeral.max}
          onChange={(e: any) => onChange('max', e)}
        />
      </Item>
    </View>
  )
}

render() {
  const { type, question, answer, numeral } = this.state
  const { onChangeType, submit } = this
  return (
    <Form>
      <Item floatingLabel={true}>
        <Input
          value={question}
          onChange={(e: any) => this.onChange('question', e.nativeEvent.text)}
        />
        <Label>Question</Label>
      </Item>
      <Item floatingLabel={true}>
        <Label>Answer</Label>
        <Input
          value={answer}
          onChange={(e: any) => this.onChange('answer', e.nativeEvent.text)}
        />
      </Item>
      <Item>
        <Label>Type</Label>
        <Picker
          iosHeader="Type of option to choose from"
          placeholder="Type of option to choose from"
          mode="dropdown"
          selectedValue={type}
          onValueChange={(value: CardTypes) => onChangeType(value)}
        >
          <Picker.Item label="Slider" value={CardTypes.slider} />
          <Picker.Item label="Stepper" value={CardTypes.stepper} />
        </Picker>
      </Item>
      {numeral && this.renderNumeral(numeral)}
      <Button
        primary={true}
        onPress={submit}
      >
        <Text>Submit</Text>
      </Button>
    </Form>
  )
}
}
const connectCreator = connect(
  null,
  (dispatch: Dispatch<{}>) => {
    return {
      addCard: (card: Card) => {
        return dispatch((addCard(card)))
      },
    }
  },
)
type IConnectProps = typeof connectCreator.allProps
export const AddFlashCardForm = connectCreator(AddFlashCardFormC)
