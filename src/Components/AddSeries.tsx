import React from 'react'
import { Form, Item, Label, Input, Button, Text, Picker } from 'native-base'
import { Serie, StoreState } from '../store'

interface Props {
  categoryId?: string
  onComplete?: () => any
}

interface State extends Serie {

}

class AddSerieC extends React.Component<Props & IConnectProps, State> {
  constructor(props: IConnectProps) {
    super(props)
    this.state = {
      categoryId: this.props.categoryId || '',
      displayText: '',
      id: ''
    }
  }
  onChange = (field: string, value: any) =>
    this.setState(({
      [field]: value
    }) as any)

  validate = () => {
    const { displayText, categoryId } = this.state
    if (!displayText || !categoryId) {
      return false
    }
    return true
  }
  submit = () => {
    const { displayText, categoryId, id } = this.state
    const { onComplete } = this.props
    if (this.validate()) {
      this.props.addSerie({ displayText, categoryId, id })
      if (onComplete) {
        onComplete()
      }
    }
  }
  render() {
    const { displayText, categoryId } = this.state
    const { categories, onComplete } = this.props
    const valid = this.validate()
    return (
      <Form>
        <Label>Category</Label>
        <Picker
          mode="dropdown"
          placeholder="Select One"
          selectedValue={categoryId}
          onValueChange={console.log}
        >
          {Object.keys(categories).map(key => {
            const category = categories[key]
            return (
              <Item key={key} label={category.displayText} value={key} />
            )
          })}
        </Picker>
        <Item floatingLabel={true}>
          <Input
            value={displayText}
            onChange={(e: any) => this.onChange('displayText', e.nativeEvent.text)}
          />
          <Label>Name of serie</Label>
        </Item>
        <Button
          primary={valid}
          disabled={!valid}
          onPress={this.submit}
        >
          <Text>Submit</Text>
        </Button>
        {onComplete &&
          <Button
            onPress={() => onComplete()}
          >
            <Text>Cancel</Text>
          </Button>}
      </Form >
    )
  }
}
import { connect, Dispatch } from 'react-redux'
import { addSerie } from '../actions'
const connectCreator = connect(
  ({ categories }: StoreState) => {
    return {
      categories
    }
  },
  (dispatch: Dispatch<{}>) => {
    return {
      addSerie: (serie: Serie) => {
        return dispatch(addSerie(serie))
      },
    }
  },
)
type IConnectProps = typeof connectCreator.allProps
export const AddSerie = connectCreator(AddSerieC)
