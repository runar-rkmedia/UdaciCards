import React, { Component } from 'react'
import { Container, Header, Content, Form, Item, Input, Label, Body, Title, Picker, Button, Text } from 'native-base'
import { Card, CardTypes } from '../store'

interface State extends Card {
  type: CardTypes | null
}
export class AddFlashCardC extends Component<IConnectProps, State> {
  state = {
    date: -1,
    question: '',
    answer: '',
    type: null,
    options: undefined,
    numeral: undefined
  }
  onChange = (field: string, value: any, subValue: string = '') => {
    if (subValue) {
      return this.setState(({
        [subValue]: ({
          [field]: value
        })
      }) as any)
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

  Field = ({ field, subValue }: { field: string, subValue?: string }) => (
    <Input value={this.state[field]} onChange={(e) => this.onChange(field, e.nativeEvent.text, subValue)} />
  )

  submit = () => {
    const { question, answer, options, numeral } = this.state
    this.props.addCard({
      date: Date.now(),
      question, answer, options, numeral
    })
  }

  render() {
    const { type } = this.state
    const { Field, onChangeType, submit } = this
    return (
      <Container>
        <Header >
          <Body>
            <Title>Add a new entry</Title>
          </Body>
        </Header>
        <Content>
          <Form>
            <Item floatingLabel={true}>
              <Label>Question</Label>
              <Field field="question" />
            </Item>
            <Item floatingLabel={true}>
              <Label>Answer</Label>
              <Field field="answer" />
            </Item>
            <Item>
              <Label>Type</Label>
              <Picker
                iosHeader="Type of option to choose from"
                placeholder="Type of option to choose from"
                mode="dropdown"
                selectedValue={type}
                onValueChange={(value) => onChangeType(value)}
              >
                <Picker.Item label="Slider" value={CardTypes.slider} />
                <Picker.Item label="Stepper" value={CardTypes.stepper} />
              </Picker>
            </Item>
            {type === CardTypes.stepper && (
              <Item floatingLabel={true}>
                <Label>Step</Label>
                <Field field="step" />
              </Item>
            )}
            <Button
              primary={true}
              onPress={submit}
            >
              <Text>Submit</Text>
            </Button>
          </Form>
        </Content>
      </Container >
    )
  }
}
import { connect, Dispatch } from 'react-redux'
import { addCard } from '../actions'
import { StoreState } from '../store'
const connectCreator = connect(
  ({ cards }: StoreState) => {
    return {
      cards
    }
  },
  (dispatch: Dispatch<{}>) => {
    return {
      addCard: (card: Card) => {
        return dispatch((addCard(card)))
      },
    }
  },
)
type IConnectProps = typeof connectCreator.allProps
export const AddFlashCard = connectCreator(AddFlashCardC)
