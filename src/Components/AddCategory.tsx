import React from 'react'
import { Form, Item, Label, Input, Button, Text } from 'native-base'
import { Category } from '../store'

interface State extends Category {

}

class AddCategoryC extends React.Component<IConnectProps, State> {
  state = {
    displayText: ''
  }
  onChange = (field: string, value: any) =>
    this.setState(({
      [field]: value
    }) as any)
  submit = () => {
    const { displayText } = this.state
    this.props.addCategory({ displayText })
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
import { addCategory } from '../actions'
const connectCreator = connect(
  null,
  (dispatch: Dispatch<{}>) => {
    return {
      addCategory: ({ displayText }: {
        displayText: string
      }) => {
        return dispatch(addCategory({ displayText }))
      },
    }
  },
)
type IConnectProps = typeof connectCreator.allProps
export const AddCategory = connectCreator(AddCategoryC)
