import React from 'react'
import { Form, Item, Label, Input, Button, Text } from 'native-base'
import { Category } from '../store'
import { NavigationScreenConfigProps } from 'react-navigation'

interface Props extends NavigationScreenConfigProps {
  category?: Category
}

interface State extends Category {
  edit: boolean
}

class AddCategoryC extends React.Component<IConnectProps, State> {
  constructor(props: IConnectProps) {
    super(props)
    const { category } = props
    this.state = {
      edit: !!category,
      displayText: '',
      id: '',
      ...category
    }
  }

  onChange = (field: string, value: any) =>
    this.setState(({
      [field]: value
    }) as any)
  submit = () => {
    const { displayText, edit, id } = this.state
    if (edit) {
      this.props.editCategory({ displayText, id })
    } else {
      this.props.addCategory(displayText)
    }
    this.props.navigation.goBack()
  }
  render() {
    const { displayText } = this.state
    return (
      <Form>
        <Item floatingLabel={true}>
          <Input
            value={displayText}
            autoFocus={true}
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
import { addCategory, editCategory } from '../actions'
const connectCreator = connect(
  null,
  (dispatch: Dispatch<{}>) => {
    return {
      addCategory: (displayText: string) => {
        return dispatch(addCategory(displayText))
      },
      editCategory: (category: Category) => {
        return dispatch(editCategory(category))
      },
    }
  },
)
type IConnectProps = typeof connectCreator.allProps & Props
export const AddCategory = connectCreator(AddCategoryC)
