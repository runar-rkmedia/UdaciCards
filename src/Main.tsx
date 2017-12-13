import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { persistor, store } from './store'
import { View, StatusBar, StatusBarProperties } from 'react-native'
import { TabNavigator } from 'react-navigation'
import { AddFlashCard, ListFlashCards } from './Components/'
import { OS } from './utils/'
import { color } from './style/'
import { FontAwesome } from '@expo/vector-icons'
import Expo, { Constants } from 'expo'
import { PersistGate } from 'redux-persist/es/integration/react'

function UdaciStatusBar({ backgroundColor, ...props }: {
  backgroundColor: string
} & StatusBarProperties) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent={true} backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator(
  {
    ListFlashCards: {
      screen: ListFlashCards,
      navigationOptions: {
        tabBarLabel: 'Cards',
        tabBarIcon: ({ tintColor }: any) => (
          <FontAwesome name={OS({ ios: 'plus-square', android: 'plus-square' })} size={30} color={tintColor} />
        )
      },
    },
    AddFlashCard: {
      screen: AddFlashCard,
      navigationOptions: {
        tabBarLabel: 'Add',
        tabBarIcon: ({ tintColor }: any) => (
          <FontAwesome name={OS({ ios: 'plus-square', android: 'plus-square' })} size={30} color={tintColor} />
        )
      },
    },
  },

  {
    navigationOptions: {
    },
    tabBarOptions: {
      activeTintColor: OS({ ios: color.purple, android: color.white }),
      style: {
        height: 56,
        backgroundColor: OS({ ios: color.white, android: color.purple }),
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
)

export default class Main extends Component {
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={{ flex: 1 }}>
            <UdaciStatusBar backgroundColor={color.purple} barStyle="light-content" />
            <Tabs />
          </View>
        </PersistGate>
      </Provider>
    )
  }
}
