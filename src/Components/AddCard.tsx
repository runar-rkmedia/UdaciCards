import React from 'react'
import { View, Text } from 'react-native'
import { Cards } from '../store'

interface Props { }

interface State extends Cards { }

export class AddCard extends React.Component<Props, State> {
  render() {
    return (
      <View>
        <Text>Flashcard here</Text>
      </View>
    )
  }
}
