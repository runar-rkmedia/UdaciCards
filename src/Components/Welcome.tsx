import React from 'react'
import { H1, H2, H3, Text, Button, View } from 'native-base'
import { StyleSheet, Animated } from 'react-native'
import { baseStyle, color } from '../style'
import { exampleData } from '../utils'
import SvgUri from 'react-native-svg-uri'
interface Props { }

const gears = require('../assets/gears.svg')

interface Props {
  onNavigate: (location: string) => any
}

interface State {
  header: {
    opacity: Animated.Value
    marginTop: Animated.Value
  }
}
const initialState = () => ({
  header: {
    opacity: new Animated.Value(0),
    marginTop: new Animated.Value(-200)
  },
  body: {
    opacity: new Animated.Value(0),
    scale: new Animated.Value(0)
  }
})

class WelcomeC extends React.Component<IConnectProps, State> {
  state = initialState()
  componentDidMount() {
    this.animateIn()
  }
  animateIn = (reset?: boolean) => {
    let { header, body } = this.state
    Animated.sequence([
      Animated.parallel([
        Animated.timing(header.opacity, {
          toValue: 1,
          duration: 1000,
        }
        ),
        Animated.timing(header.marginTop, {
          toValue: 0,
          duration: 1000,
        }
        ),
      ]),
      Animated.parallel([
        Animated.timing(body.opacity, {
          toValue: 1,
          duration: 1000,
        }
        ),
        Animated.spring(body.scale, {
          toValue: 1,
        }
        ),
      ]),
    ]).start()
  }
  animateOut = (callback: any = (() => { return })) => {
    let { header, body } = this.state
    Animated.sequence([
      Animated.parallel([
        Animated.timing(header.opacity, {
          toValue: 0,
          duration: 1000,
        }
        ),
        Animated.timing(body.opacity, {
          toValue: 0,
          duration: 1000,
        }
        ),
        Animated.timing(body.scale, {
          delay: 400,
          toValue: .5,
        }
        ),
      ]),
    ]).start(callback)
  }
  resetAnimation = () => {
    let { header, body } = this.state
    header.opacity.setValue(0)
    header.marginTop.setValue(0)
    body.opacity.setValue(0)
    body.scale.setValue(0)
  }
  render() {
    const br = '\n'
    let { header, body } = this.state
    let { onNavigate } = this.props
    return (
      <View style={[baseStyle.center, { backgroundColor: color.NavyBlue }]} >
        <View style={{ flex: .2 }} />
        <Animated.View
          style={{
            flex: .2,
            opacity: header.opacity,
            marginTop: header.marginTop,
          }}
        >
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View
              style={{ position: 'absolute', left: -65, top: -10 }}
            >
              <SvgUri
                width={60}
                height={60}
                fill={color.white}
                source={gears}
              />
            </View>
            <H1 style={[styles.text, styles.logo]} >UdaciCards</H1>
          </View>

          <H2 style={[styles.text, styles.welcome]}>Welcome</H2>
        </Animated.View>
        <Animated.View
          style={{
            flex: 1,
            opacity: body.opacity,
            transform: [{ scale: body.scale }]
          }}
        >
          <H3
            style={[styles.text, styles.welcome, { flex: 1 }]}
          >
            You seem new around here.{br}Thank you for droppping by.
          </H3>
          <Text style={[styles.text, { flex: 1, fontSize: 20 }]}>
            Would you like to get started right away with some awesome Flash Cards to get a feel for this place?
            </Text>
          <View style={{ flex: 1 }}>
            <Button
              onPress={() => {
                this.props.recieveStore(exampleData)
                this.animateOut(() => onNavigate('ListSeries'))
              }}
              {...buttonProps}
            >
              <Text>Yes, give me all your Flash Cards</Text>
            </Button>
            <Button
              onPress={() => this.animateOut(() => onNavigate('AddCategory'))}
              {...buttonProps}
            >
              <Text>No, I want to start fresh</Text>
            </Button>
          </View>
        </Animated.View>
        <View style={{ flex: .5 }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    width: 300,
    marginBottom: 20,
    justifyContent: 'center',
  },
  logo: {
  },
  welcome: {
    opacity: .8
  },
  subtitle: {
    fontSize: 24,
  },
  text: {
    color: color.white,
    maxWidth: 500,
    textAlign: 'center',
  }
})

const buttonProps = {
  style: styles.button,
  bordered: true,
  light: true
}

import { connect, Dispatch } from 'react-redux'
import { recieveCards, recieveSerie, recieveCategory } from '../actions'
import { StoreState } from '../store'
const connectCreator = connect(
  null,
  (dispatch: Dispatch<{}>) => {
    return {
      recieveStore: (store: StoreState) => {
        return Promise.all([
          dispatch(recieveCards(store.cards)),
          dispatch(recieveSerie(store.series)),
          dispatch(recieveCategory(store.categories)),
        ])
      },
    }
  },
)
type IConnectProps = typeof connectCreator.allProps & Props
export const Welcome = connectCreator(WelcomeC)
