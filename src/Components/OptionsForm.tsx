import React from 'react'
import { View, H2, Text, InputGroup, Button, Icon, Input } from 'native-base'
import { CardOptions } from '../store'
import { StyleSheet } from 'react-native'
import { color } from '../style'
import { inputProps } from '../style'

interface Props {
  options: CardOptions[]
  onChange: (options: CardOptions[]) => void
}

export class OptionsForm extends React.Component<Props> {
  setCorrect = (correctOption: CardOptions) => {
    const { options, onChange } = this.props
    const newOptions = options!.slice()
    for (let option of newOptions) {
      option.correct = option === correctOption
    }
    onChange(newOptions)
  }
  setChange = (key: string, value: string, i: number) => {
    const { options, onChange } = this.props
    const newOptions = options!.slice()
    newOptions[i][key] = value
    onChange(newOptions)
  }
  addOptions = () => {
    const { options, onChange } = this.props
    let newOptions: CardOptions[] = (options || [])
    newOptions.push({
      displayText: '',
      correct: false
    })
    onChange(newOptions)
  }
  render() {
    const { options } = this.props
    return (
      <View>
        <H2>Options</H2>
        <Text>
          Add your options below.
          Set the correct answer by checking the corresponding row.
        </Text>
        {options.map((option, i) => (
          <InputGroup key={i}>
            <Button
              transparent={true}
              onPress={() => this.setCorrect(option)}
            >
              {option.correct ? (
                <Icon name="checkmark-circle" style={[styles.correctButtons, { color: color.success }]} />
              ) : (
                  <Icon name="close-circle" style={[styles.correctButtons, { color: color.disabled }]} />
                )}

            </Button>
            <Input
              {...inputProps}
              placeholder={`Choice #${i + 1}`}
              maxLength={50}
              value={option.displayText}
              onChange={(e: any) => this.setChange('displayText', e.nativeEvent.text, i)}
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
}

const styles = StyleSheet.create({
  correctButtons: {
    fontSize: 30
  }
})
