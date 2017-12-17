import React from 'react'
import { connect } from 'react-redux'
import { StoreState } from '../store'
import { Icon, Separator, Text, View, Button } from 'native-base'
import { AddSerie, SeriesList } from './'
import { StyleSheet } from 'react-native'
import { NavigationScreenConfigProps } from 'react-navigation'

interface State {
  addToId: string
}

class ListAllCategoriesC extends React.Component<NavigationScreenConfigProps & IConnectProps, State> {
  state = {
    addToId: ''
  }
  toggleAddSerieForm = (addToId: string) => {
    this.setState({ addToId })
  }
  render() {
    const { categories, series, navigation } = this.props
    const { addToId } = this.state
    return (
      <View style={{ flex: 1 }}>
        {Object.keys(categories).map(key => {
          const { displayText } = categories[key]
          return (
            <View key={key}>
              <Separator bordered={true}>
                <Text>{displayText}</Text>
              </Separator>
              {series[key] && (
                <SeriesList
                  series={series[key]}
                  onPress={(id: string) => navigation.navigate('SerieView', {serie: series[key][id]})}
                />
              )}
              <View>
                {addToId === key ? (
                  <View style={styles.listForm} >
                    <AddSerie
                      categoryId={key}
                      onComplete={() => this.toggleAddSerieForm('')}
                    />
                  </View>
                ) : (
                    <Button
                      onPress={() => this.toggleAddSerieForm(key)}
                    >
                      <Icon name="add" />
                      <Text>Add Series to this category</Text>
                    </Button>
                  )}
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}
const connectCreator = connect(
  ({ categories, series }: StoreState) => {
    let seriesGrouped = {}
    Object.keys(series).map(key => {
      const serie = series[key]
      seriesGrouped[serie.categoryId] = {
        ...seriesGrouped[serie.categoryId],
        [key]: serie
      }
    })
    return {
      series: seriesGrouped,
      categories
    }
  }
)
type IConnectProps = typeof connectCreator.allProps
export const ListAllCategories = connectCreator(ListAllCategoriesC)

const styles = StyleSheet.create({
  listForm: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  }
})
