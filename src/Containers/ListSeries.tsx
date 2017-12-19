import React from 'react'
import { ListAllCategories } from '../Components'
import {
  Body, Title, Content, Icon, Fab, Button, Container, Header,
  Right
} from 'native-base'
import { NavigationScreenConfigProps } from 'react-navigation'

interface Props {

}
interface State {
  edit: boolean
}
export class ListSeries extends React.Component<Props & NavigationScreenConfigProps, State> {
  state = {
    edit: false
  }
  render() {
    const { navigation, screenProps } = this.props
    const { edit } = this.state
    return (
      <Container>
        <Header >
          <Body>
            <Title>Edit FlashCards</Title>
          </Body>
          <Right>
            <Button
              transparent={true}
              onPress={() => this.setState(state => ({
                ...state,
                edit: !state.edit
              }))}
            >
              <Icon name="create" />
            </Button>
          </Right>
        </Header>
        <Content padder={false}>
          <ListAllCategories
            {...{ navigation, screenProps, edit }}
          />
        </Content>
        {edit && (
          <Fab
            active={true}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => navigation.navigate('AddCategory')}
          >
            <Icon name="add" />
          </Fab>
        )}
      </Container >
    )
  }
}
