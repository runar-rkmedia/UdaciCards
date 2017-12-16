import React from 'react'
import { connect } from 'react-redux'
import { StoreState, Serie } from '../store'
import { Icon, Separator, ListItem, Text, View, Left, Right, Body } from 'native-base'

const ListAllCategoriesC = ({ categories }: IConnectProps) => (
  <View style={{ flex: 1 }}>
    {Object.keys(categories).map(key => {
      const { displayText } = categories[key]
      return (
        <View key={key}>
          <Separator bordered={true}>
            <Text>{displayText}</Text>
          </Separator>
        </View>
      )
    })}
  </View>
)
const connectCreator = connect(
  ({ categories, series }: StoreState) => {
    const seriesGrouped = Object.keys(series)
      .map(key => series[key])
      .reduce((h, a) => ({
        ...h,
        [a.categoryId]: (h[a.categoryId] || []).push(a)
      }), {})
    console.log(seriesGrouped)
    return {
      series: seriesGrouped,
      categories
    }
  }
)
type IConnectProps = typeof connectCreator.allProps
export const ListAllCategories = connectCreator(ListAllCategoriesC)
