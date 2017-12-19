import React from 'react'
import { AddFlashCardForm } from '../Components'
import {
  Body, Title, Content, Icon, Button, Container, Header,
  Right, Left
} from 'native-base'
import { NavigationScreenConfigProps } from 'react-navigation'

interface Props {

}
interface State {
  edit: boolean
}
export class EditSerie extends React.Component<Props & NavigationScreenConfigProps, State> {
  state = {
    edit: false
  }
  render() {
    const { edit } = this.state
    const { navigation } = this.props
    return (
      <Container>
        <Header >
          <Left>
            <Button
              transparent={true}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{edit ? 'Edit Flash Cards' : 'Flash Cards'}</Title>
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
          <AddFlashCardForm  {...this.props} />
        </Content>
      </Container >
    )
  }
}
