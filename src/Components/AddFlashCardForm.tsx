import React, { Component } from 'react'
import {
  Form, Item, Input, Label, Picker, Button, Text, View, Icon, InputGroup, H2
} from 'native-base'
import { StyleSheet, Slider } from 'react-native'
import { Card, CardTypes, CardNumeral, StoreState, CardOptions } from '../store'
import { connect, Dispatch } from 'react-redux'
import { NavigationScreenConfigProps } from 'react-navigation'
import { Col, Grid } from 'react-native-easy-grid'
import { addCard } from '../actions'
import { SelectSeries } from './'
import { color } from '../style'
import { isNumber } from '../utils'

const styles = StyleSheet.create({
  correctButtons: {
    fontSize: 30
  }
})

interface State extends Card {
  type: CardTypes | null
}

const inputProps = {
  underline: true,
  floatingLabel: true,
}

const initialState: State = {
  id: '',
  seriesId: '',
  date: -1,
  question: '',
  type: null,
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
}
class AddFlashCardFormC extends Component<NavigationScreenConfigProps & IConnectProps, State> {
  state = initialState
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
    if (!question || !seriesId || !type) {
      return 'Some fields were not set.'
    }
    switch (type) {
      case CardTypes.options:
        for (let option of options!) {
          if (!option.displayText) {
            return 'Some Options are missing texts.'
          }
        }
        break
      case CardTypes.slider:
        const { min, max, step, correct } = (numeral as CardNumeral)
        for (let n of [max, min, step, correct]) {
          if (!isNumber(n)) {
            return 'Some fields are not valid numbers.'
          }
        }
        if (step <= 0 || step >= max) {
          return 'Step should be above zero and less than max.'
        }
        if (min >= max) {
          return 'Min-value should be less than max-value'
        }
        if (correct < min || correct > max) {
          return 'The answer-value should be somewhere between min and max.'
        }
        break
      default:
        return 'Got an unknown type'
    }
    return false
  }
  submit = () => {
    if (!this.formErrors()) {
      const { question, options, numeral, seriesId, id, type } = this.state
      let typeObject = type === CardTypes.options ? { options } : { numeral }
      this.props.addCard({
        date: Date.now(),
        ...typeObject,
        question, seriesId, id
      })
    }
  }

  renderNumeral = () => {
    const { numeral } = this.state
    const { step, min, max, correct } = numeral!
    const onChange = (key: string, value: any) => this.onChange(key, value, 'numeral')
    const onNumChange = (key: string, e: any) => onChange(key, e.nativeEvent.text.replace(/[^0-9,.]/g, ''))

    return (
      <View>
        <H2>Slider for numbers</H2>
        <Grid>
          <Col>
            <Item {...inputProps}>
              <Label>Step</Label>
              <Input
                keyboardType="numeric"
                value={step.toString()}
                onChange={(e: any) => onNumChange('step', e)}
              />
            </Item>
          </Col>
          <Col>
            <Item {...inputProps}>
              <Label>Min</Label>
              <Input
                keyboardType="numeric"
                value={min.toString()}
                onChange={(e: any) => onNumChange('min', e)}
              />
            </Item>
          </Col>
          <Col>
            <Item {...inputProps}>
              <Label>Max</Label>
              <Input
                keyboardType="numeric"
                value={max.toString()}
                onChange={(e: any) => onNumChange('max', e)}
              />
            </Item>
          </Col>
        </Grid>
        <Label>Answer: ({correct})</Label>
        {!this.formErrors() && (
          <Slider
            value={correct}
            step={step}
            minimumValue={min}
            maximumValue={max}
            onValueChange={(value) => onChange('correct', value)}
          />
        )}
      </View>
    )
  }
  addOptions = () => {
    return this.setState(state => {
      let options: CardOptions[] = (state.options || [])
      options.push({
        displayText: '',
        correct: false
      })
      return {
        options
      }
    })
  }
  renderOptions = () => {
    const { options } = this.state
    const setCorrect = (correctOption: CardOptions) => {
      const newOptions = options!.slice()
      for (let option of newOptions) {
        option.correct = option === correctOption
      }
      this.setState(state => ({
        ...state,
        options: newOptions
      }))
    }
    const onChange = (key: string, value: any, i: number) => {
      return this.setState((state) => {
        let stateOptions = state.options!.slice()
        stateOptions[i][key] = value
        return {
          ...state,
          options: stateOptions
        }
      })
    }
    return (
      <View>
        <H2>Options</H2>
        <Text>
          Add your options below.
          Set the correct answer by checking the corresponding row.
        </Text>
        {options!.map((option, i) => (
          <InputGroup key={i}>
            <Button
              transparent={true}
              onPress={() => setCorrect(option)}
            >
              {option.correct ? (
                <Icon name="checkmark-circle" style={[styles.correctButtons, { color: color.success }]} />
              ) : (
                  <Icon name="close-circle" style={[styles.correctButtons, { color: color.disabled }]} />
                )}

            </Button>
            <Input
              placeholder={`Choice #${i + 1}`}
              value={option.displayText}
              onChange={(e: any) => onChange('displayText', e.nativeEvent.text, i)}
            />
          </InputGroup>
        ))}
        <Button
          transparent={true}
          onPress={this.addOptions}
        >
          <Icon name="add" color={color.orange} />
          <Text>Add option</Text>
        </Button>
      </View>
    )
  }
  renderType = () => {
    const { type } = this.state
    if (!type) {
      return null
    }
    switch (type) {
      case CardTypes.options:
        return this.renderOptions()
      case CardTypes.slider:
        return this.renderNumeral()
      default:
        return null
    }
  }
  render() {
    const { question, seriesId, type } = this.state
    const { series, navigation } = this.props
    const { submit, onChange } = this
    const formErrors = this.formErrors()
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
        <Item floatingLabel={true}>
          <Input
            value={question}
            onChange={(e: any) => this.onChange('question', e.nativeEvent.text)}
          />
          <Label>Question</Label>
        </Item>
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
        {this.renderType()}
        <Button
          primary={true}
          disabled={!!formErrors}
          onPress={submit}
        >
          <Text>Submit</Text>
        </Button>
        {formErrors && (
          <Text>{formErrors}</Text>
        )}
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
