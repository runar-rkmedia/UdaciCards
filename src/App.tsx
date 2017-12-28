import React, { Component } from 'react'
import { View, StatusBar, StatusBarProperties } from 'react-native'
import { Provider } from 'react-redux'
import Expo, { Constants, AppLoading } from 'expo'
import { persistor, store,  } from './store'
import { color } from './Style'
import { Root } from './Containers'
import { PersistGate } from 'redux-persist/es/integration/react'

function UdaciStatusBar({ backgroundColor, ...props }: {
  backgroundColor: string
} & StatusBarProperties) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent={true} backgroundColor={backgroundColor} barStyle={'light-content'} />
    </View>
  )
}
interface State {
  fontsAreLoaded: boolean,
}

export default class extends Component<{}, State> {
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
        <PersistGate
          loading={<AppLoading />}
          persistor={persistor}
        >
          <UdaciStatusBar backgroundColor={color.purple} barStyle="light-content" />
          <Root/>
        </PersistGate>
      </Provider>
    )
  }
}
