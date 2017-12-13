import * as React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import { View, StatusBar, StatusBarProperties } from 'react-native'
import { TabNavigator } from 'react-navigation'
import { AddCard } from './Components/'
import { OS } from './utils/'
import { color } from './Style/'
import { FontAwesome } from '@expo/vector-icons'
import { Constants } from 'expo'

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
    AddCard: {
      screen: AddCard,
      navigationOptions: {
        tabBarLabel: 'Add Card',
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

export default class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={color.purple} barStyle="light-content" />
          <Tabs />
        </View>
      </Provider>
    )
  }
}
