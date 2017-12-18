import React, { Component } from 'react'
import { Alert } from 'react-native'
import {
  Form, Item, Input, Label, Picker, Button, Text
} from 'native-base'
import { Card, CardTypes, CardNumeral, StoreState } from '../store'
import { connect, Dispatch } from 'react-redux'
import { NavigationScreenConfigProps } from 'react-navigation'
import { addCard } from '../actions'
import { SelectSeries, OptionsForm, NumeralsForm } from './'
import { isNumber } from '../utils'
import { inputProps } from '../style'

interface State extends Card {
  type: CardTypes | null
}

const getInitialState = () => ({
  id: '',
  seriesId: '',
  date: -1,
  question: '',
  type: CardTypes.options,
  options: [
    {
      displayText: '',
      correct: true,
    },
    {
      displayText: '',
      correct: false
    }
  ],
  numeral: {
    min: 0,
    step: 1,
    max: 10,
    correct: 0
  }
})
class AddFlashCardFormC extends Component<NavigationScreenConfigProps & IConnectProps, State> {
  state = getInitialState()
  QuestionInput: any
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
  formErrors = () => {
    const { question, seriesId, type, options, numeral } = this.state
    let errors = []
    if (!question) {
      errors.push('Please set a question-text')
    }
    if (!seriesId) {
      errors.push('Please select a serie.')
    }
    if (!type) {
      errors.push('Please select a type.')
    }
    switch (type) {
      case CardTypes.options:
        for (let i = 0; i < options!.length; i++) {
          if (!options![i].displayText) {
            errors.push(`Choice #${i} is missing text.`)
          }
        }
        break
      case CardTypes.slider:
        const { min, max, step, correct } = (numeral as CardNumeral)
        for (let n of [max, min, step, correct]) {
          if (!isNumber(n)) {
            errors.push('Some fields are not valid numbers.')
          }
        }
        if (step <= 0 || step >= max) {
          errors.push('Step should be above zero and less than max.')
        }
        if (min >= max) {
          errors.push('Min-value should be less than max-value')
        }
        if (correct < min || correct > max) {
          errors.push('The answer-value should be somewhere between min and max.')
        }
        break
      default:
        errors.push('Got an unknown type')
    }
    return errors
  }
  submit = () => {
    if (!this.formErrors().length) {
      const { question, options, numeral, seriesId, id, type } = this.state
      let typeObject = type === CardTypes.options ? { options } : { numeral }
      this.props.addCard({
        date: Date.now(),
        ...typeObject,
        question, seriesId, id
      })
      this.setState(state => ({
        ...getInitialState(),
        seriesId,
        type,
      }))
      this.QuestionInput._root.focus()
    }
  }
  displayErrors = (errors: string[]) => {
    Alert.alert('Form Errors', `– ${errors.join('\n– ')}`)
  }
  render() {
    const { question, seriesId, type, options, numeral } = this.state
    const { series, navigation } = this.props
    const { submit, onChange, displayErrors } = this
    let formErrors = this.formErrors()
    return (
      <Form>
        <Label>Series</Label>
        <SelectSeries
          {...{
            seriesId,
            series,
            onAdd: () => navigation.navigate('AddSerie'),
            onValueChange: (Id) => onChange('seriesId', Id)
          }}
        />
        <Item>
          <Label>Type</Label>
          <Picker
            iosHeader="Type of option to choose from"
            placeholder="Type of option to choose from"
            mode="dropdown"
            selectedValue={type}
            onValueChange={(value: CardTypes) => onChange('type', value)}
          >
            <Picker.Item label="Choice" value={CardTypes.options} />
            <Picker.Item label="Slider for numbers" value={CardTypes.slider} />
          </Picker>
        </Item>
        <Item floatingLabel={true}>
          <Input
            {...inputProps}
            getRef={(ref: any) => this.QuestionInput = ref}
            autoFocus={true}
            value={question}
            maxLength={300}
            onChange={(e: any) => this.onChange('question', e.nativeEvent.text)}
          />
          <Label>Question</Label>
        </Item>
        {type && (type === CardTypes.options ? options && (
          <OptionsForm
            options={options}
            onChange={opt => this.setState({ options: opt })}
          />
        ) : numeral && (
          <NumeralsForm
            numeral={numeral}
            onChange={nums => this.setState({ numeral: nums })}
            formErrors={!!formErrors.length}
          />
        ))}
        <Button
          primary={true}
          light={!!formErrors.length}
          onPress={() => { !!formErrors.length ? displayErrors(formErrors) : submit() }}
        >
          <Text>Submit</Text>
        </Button>
      </Form>
    )
  }
}
const connectCreator = connect(
  ({ series }: StoreState) => {
    return {
      series
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
export const AddFlashCardForm = connectCreator(AddFlashCardFormC)
