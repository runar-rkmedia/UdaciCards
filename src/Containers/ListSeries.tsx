import React from 'react'
import { ListAllCategories } from '../Components'
import { Content, Icon, Fab, Button, Container, } from 'native-base'
import { NavigationScreenConfigProps } from 'react-navigation'
import { MyStack } from '../Containers'
interface Props {
  edit: boolean
}
export class ListSeries extends React.Component<Props & NavigationScreenConfigProps> {
  static navigationOptions = ({ navigation }: NavigationScreenConfigProps) => {
    const { state, setParams } = navigation
    const edit = state.params ? state.params.edit : false
    return {
      title: 'List of FlashCards',
      headerRight: (
        <Button
          transparent={true}
          onPress={() => setParams({ edit: !edit })}
        >
          <Icon name="create" />
        </Button>)
    }
  }
  render() {
    const { navigation, screenProps } = this.props
    const { edit } = this.props
    return (
      <Container>
        <Content style={{ flex: 1 }}>
          <ListAllCategories
            {...{ navigation, screenProps, edit }}
          />
        </Content >
        {edit && (
          <Fab
            active={true}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => navigation.navigate(MyStack.AddCategory)}
          >
            <Icon name="add" />
          </Fab>
        )}
      </Container>
    )
  }
}
