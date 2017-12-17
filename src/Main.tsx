import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { persistor, store } from './store'
import { View, StatusBar, StatusBarProperties } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { ListFlashCards, AddFlashCard } from './Containers/'
import { AddSerie, AddCategory, SerieView } from './Components/'
import { OS } from './utils/'
import { color } from './style/'
import { FontAwesome } from '@expo/vector-icons'
import Expo, { Constants, AppLoading } from 'expo'
import { PersistGate } from 'redux-persist/es/integration/react'
import { withMappedNavigationProps } from 'react-navigation-props-mapper'

function UdaciStatusBar({ backgroundColor, ...props }: {
  backgroundColor: string
} & StatusBarProperties) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent={true} backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const AddFlashCardStack = StackNavigator({
  AddFlashCard: {
    screen: AddFlashCard
  },
  AddSerie: {
    screen: AddSerie
  },
  AddCategory: {
    screen: AddCategory
  }
})

const Cards = StackNavigator({
  ListFlashCards: {
    screen: ListFlashCards
  },
  SerieView: {
    screen: withMappedNavigationProps(SerieView)
  },
})

const Tabs = TabNavigator(
  {
    Cards: {
      screen: Cards,
      navigationOptions: {
        tabBarLabel: 'Cards',
        tabBarIcon: ({ tintColor }: any) => (
          <FontAwesome name={OS({ ios: 'plus-square', android: 'plus-square' })} size={30} color={tintColor} />
        )
      },
    },
    AddFlashCard: {
      screen: AddFlashCardStack,
      navigationOptions: {
        tabBarLabel: 'Add',
        tabBarIcon: ({ tintColor }: any) => (
          <FontAwesome name={OS({ ios: 'plus-square', android: 'plus-square' })} size={30} color={tintColor} />
        )
      },
    },
  },

  {
    lazy: true,
    animationEnabled: true,
    order: ['AddFlashCard', 'Cards'],
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

interface State {
  fontsAreLoaded: boolean
}

export default class Main extends Component<{}, State> {
  state = { fontsAreLoaded: false }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
    this.setState({ fontsAreLoaded: true })
  }

  render() {
    if (!this.state.fontsAreLoaded) {
      return <AppLoading />
    }
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
