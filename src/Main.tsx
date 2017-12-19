import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { persistor, store } from './store'
import { View, StatusBar, StatusBarProperties } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { AddFlashCard, ListSeries } from './Containers/'
import { AddSerie, AddCategory, SerieView } from './Components/'
import { color } from './style/'
import Expo, { Constants, AppLoading } from 'expo'
import { PersistGate } from 'redux-persist/es/integration/react'
import { withMappedNavigationProps } from 'react-navigation-props-mapper'

function UdaciStatusBar({ backgroundColor, ...props }: {
  backgroundColor: string
} & StatusBarProperties) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent={true} backgroundColor={backgroundColor} barStyle={'light-content'}  />
    </View>
  )
}

const FlashCards = StackNavigator(
  {
    ListSeries: { screen: ListSeries },
    SerieView: { screen: withMappedNavigationProps(SerieView) },
    AddFlashCard: { screen: withMappedNavigationProps(AddFlashCard) },
    AddSerie: { screen: AddSerie },
    AddCategory: { screen: withMappedNavigationProps(AddCategory) },
  },
  {
    initialRouteName: 'ListSeries',
    headerMode: 'none',
  }
)

interface State {
  fontsAreLoaded: boolean,
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
          <UdaciStatusBar backgroundColor={color.purple} barStyle="light-content" />
          <FlashCards />
        </PersistGate>
      </Provider>
    )
  }
}
