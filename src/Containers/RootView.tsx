import React, { Component } from 'react'

import { StackNavigator, NavigationRouteConfig, NavigationScreenConfigProps } from 'react-navigation'
import { ListSeries } from './'
import { AddFlashCardForm } from '../Components'
import { store } from '../store'
import {
  AddSerie,
  AddCategory,
  QuizView,
  Welcome,
  SerieEntry
} from '../Components/'

import { withMappedNavigationProps } from 'react-navigation-props-mapper'

interface Props {
}
interface State {
  isEmpty: boolean
  initialRouteName: string
}

export enum MyStack {
  ListSeries = 'ListSeries',
  QuizView = 'QuizView',
  SerieEntry = 'SerieEntry',
  AddFlashCard = 'AddFlashCard',
  AddSerie = 'AddSerie',
  AddCategory = 'AddCategory',
}

type StackT = {
  [s in MyStack]: NavigationRouteConfig<{
    screen: any
  }>
}

const Stack: StackT = {
  ListSeries: { screen: withMappedNavigationProps(ListSeries) },
  SerieEntry: {
    screen: withMappedNavigationProps(SerieEntry),
    navigationOptions: (props: NavigationScreenConfigProps) => ({
      title: `${props.navigation.state.params.serie.displayText}`,
    }
    ),

  },
  QuizView: {
    screen: withMappedNavigationProps(QuizView),
    navigationOptions: (props: NavigationScreenConfigProps) => ({
      title: `Quiz: ${props.navigation.state.params.serie.displayText}`,
    }
    ),
  },
  AddFlashCard: {
    screen: withMappedNavigationProps(AddFlashCardForm),
    navigationOptions: (props: NavigationScreenConfigProps) => ({
      title: `Add Card: ${props.navigation.state.params.serie.displayText}`,
    }
    ),
  },
  AddSerie: { screen: AddSerie },
  AddCategory: {
    screen: withMappedNavigationProps(AddCategory),
    navigationOptions: {
      title: 'Add Category'
    }
  },
}
const FlashCardsListSeries = StackNavigator(
  Stack,
  {
    initialRouteName: MyStack.ListSeries
  }
)
const FlashCardsAddCategory = StackNavigator(
  Stack,
  {
    initialRouteName: MyStack.AddCategory
  }
)

export class Root extends Component<Props, State> {
  state = {
    isEmpty: true,
    initialRouteName: 'ListSeries'
  }
  componentWillMount() {
    const { cards, series, categories } = (store.getState() as any)
    for (let obj of [cards, series, categories]) {
      if (Object.keys(obj).length) {
        this.setState({
          isEmpty: false
        })
        break
      }
    }

  }
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return nextState.isEmpty !== this.state.isEmpty
  }
  onNavigate = (location: string) => {
    this.setState({
      isEmpty: false,
      initialRouteName: location
    })
  }
  render() {
    const { isEmpty, initialRouteName } = this.state
    if (isEmpty) {
      return (<Welcome onNavigate={this.onNavigate} />)
    }
    if (initialRouteName === 'AddCategory') {
      return (<FlashCardsAddCategory />)
    }
    return (
      <FlashCardsListSeries />
    )
  }
}
