import React, { Component } from 'react'

import { StackNavigator } from 'react-navigation'
import { ListSeries, EditSerie } from './'
import { store } from '../store'
import { AddSerie, AddCategory, SerieView, Welcome } from '../Components/'

import { withMappedNavigationProps } from 'react-navigation-props-mapper'

interface Props {
}
interface State {
  isEmpty: boolean
  initialRouteName: string
}

const Stack = {
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
  SerieView: { screen: withMappedNavigationProps(SerieView) },
  AddFlashCard: { screen: withMappedNavigationProps(EditSerie) },
  AddSerie: { screen: AddSerie },
  AddCategory: { screen: withMappedNavigationProps(AddCategory) },
}
const FlashCardsListSeries = StackNavigator(
  Stack,
  {
    initialRouteName: 'ListSeries'
  }
)
const FlashCardsAddCategory = StackNavigator(
  Stack,
  {
    initialRouteName: 'AddCategory'
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
