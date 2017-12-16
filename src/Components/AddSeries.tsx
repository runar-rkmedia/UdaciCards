import React from 'react'
import { Form, Item, Label, Input, Button, Text } from 'native-base'
import { Serie } from '../store'

interface State extends Serie {

}

class AddSerieC extends React.Component<IConnectProps, State> {
  state = {
    categoryId: '',
    displayText: ''
  }
  onChange = (field: string, value: any) =>
    this.setState(({
      [field]: value
    }) as any)
  submit = () => {
    const { displayText, categoryId } = this.state
    this.props.addSerie({ displayText, categoryId })
  }
  render() {
    const { displayText } = this.state
    return (
      <Form>
        <Item floatingLabel={true}>
          <Input
            value={displayText}
            onChange={(e: any) => this.onChange('displayText', e.nativeEvent.text)}
          />
          <Label>Name of category</Label>
        </Item>
        <Button
          primary={true}
          onPress={this.submit}
        >
          <Text>Submit</Text>
        </Button>
      </Form>
    )
  }
}
import { connect, Dispatch } from 'react-redux'
import { addSerie } from '../actions'
const connectCreator = connect(
  null,
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
