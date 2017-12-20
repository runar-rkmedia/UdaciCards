import React from 'react'
import { H1, H2, H3, Text, Button, View, Thumbnail } from 'native-base'
import { NavigationScreenConfigProps } from 'react-navigation'
import { StyleSheet, Animated, Image } from 'react-native'
import { baseStyle, color } from '../style'
interface Props { }

interface State {
  header: {
    opacity: Animated.Value
    marginTop: Animated.Value
  }
}
export class Welcome extends React.Component<Props, State> {
  state = {
    header: {
      opacity: new Animated.Value(0),
      marginTop: new Animated.Value(-200)
    },
    body: {
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0)
    }
  }
  static navigationOptions = ({ navigation }: NavigationScreenConfigProps) => {
    return {
      header: null
    }
  }
  componentDidMount() {
    let { header, body } = this.state
    Animated.sequence([
      Animated.parallel([
        Animated.timing(header.opacity, {
          toValue: 1,
          duration: 1000,
          delay: 8000,
        }
        ),
        Animated.timing(header.marginTop, {
          toValue: 0,
          delay: 8000,
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
  render() {
    const br = '\n'
    let { header, body } = this.state
    return (
      <View style={[baseStyle.center, { backgroundColor: color.lightPurp }]} >
        <View style={{ flex: .2 }} />
        <Animated.View
          style={{
            flex: .2,
            opacity: header.opacity,
            marginTop: header.marginTop,
          }}
        >
          <H1 style={[styles.text, styles.logo]} >UdaciCards</H1>
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
              {...buttonProps}
            >
              <Text style={{ textAlign: 'center' }}>Yes, give me all your Flash Cards</Text>
            </Button>
            <Button
              {...buttonProps}
            >
              <Text style={{ textAlign: 'center' }}>No, I want to start fresh</Text>
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
    marginBottom: 20
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
