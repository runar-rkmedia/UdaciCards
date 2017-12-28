import React from 'react'
import { View, H2, Input, Item, Label } from 'native-base'
import { Col, Grid } from 'react-native-easy-grid'
import { CardNumeral } from '../store'
import { Slider } from 'react-native'
import { inputProps } from '../Style'

interface Props {
  numeral: CardNumeral
  onChange: (numeral: CardNumeral) => any
  formErrors: boolean
}
export class NumeralsForm extends React.Component<Props> {
  onChange = (key: string, value: any) => {
    const { numeral, onChange } = this.props
    numeral[key] = value
    onChange(numeral)
  }
  onNumChange = (key: string, e: any) => this.onChange(key, e.nativeEvent.text.replace(/[^0-9,.]/g, ''))
  render() {
    const { numeral, formErrors } = this.props
    const { step, min, max, correct } = numeral!
    const { onNumChange, onChange } = this

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
        {!formErrors && (
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
}
