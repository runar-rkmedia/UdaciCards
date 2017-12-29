import React from 'react'
import { connect } from 'react-redux'
import { StoreState } from '../store'
import { Separator, Text, View, Card, Button, Icon } from 'native-base'
import { AddSerie, SeriesList } from './'
import { StyleSheet } from 'react-native'
import { NavigationScreenConfigProps } from 'react-navigation'
import { Col, Grid } from 'react-native-easy-grid'
import { getUserScore } from '../utils'
import { MyStack } from '../Containers'
interface Props extends NavigationScreenConfigProps {
  edit?: boolean
}

interface State {
  addToId: string
}

class ListAllCategoriesC extends React.Component<Props & IConnectProps, State> {
  state = {
    addToId: ''
  }
  toggleAddSerieForm = (addToId: string) => {
    this.setState({ addToId })
  }
  render() {
    const { categories, series, navigation, edit, userAnswer, cards } = this.props
    const { addToId } = this.state
    return (
      <View style={{ flex: 1 }}>
        {Object.keys(categories).map(key => {
          const category = categories[key]
          const { displayText } = category
          const categorySeries =  series[key] ? Object.keys(series[key]).map(k => series[key][k]) : []
          const categoryCards = Object.keys(cards).map(k => cards[k])
            .filter(card => categorySeries.find(serie => serie.id === card.seriesId))
          const [points, sum] = getUserScore(userAnswer, categoryCards)
          return (
            <View key={key}>
              {edit ? (
                <Separator
                  style={{ paddingRight: 15, height: 50 }}
                  bordered={true}

                >
                  <Grid>
                    <Col>
                      <Button
                        transparent={true}
                        onPress={() =>
                          navigation.navigate(MyStack.AddCategory, { category })
                        }
                      >
                        <Text style={{ fontSize: 18 }}>{displayText} (Edit)</Text>
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        iconLeft={true}
                        style={{ alignSelf: 'flex-end' }}
                        transparent={true}
                        onPress={() => this.toggleAddSerieForm(key)}
                      >
                        <Icon name="add" />
                        <Text style={{ fontSize: 18, textAlign: 'right', paddingRight: 0 }}>Add Serie</Text>
                      </Button>
                    </Col>
                  </Grid>
                </Separator>
              ) : (
                  <Separator bordered={true}>
                    <Text>{`${displayText} ${points}/${sum}`}</Text>
                  </Separator>
                )}
              {series[key] && (
                <SeriesList
                  series={series[key]}
                  onPress={(id: string) => navigation.navigate(
                    edit ? 'AddFlashCard' : 'SerieEntry',
                    { serie: series[key][id] })
                  }
                />
              )}
              <View>
                {edit && addToId === key && (
                  <View style={styles.listForm} >
                    <Card>
                      <AddSerie
                        categoryId={key}
                        onComplete={() => this.toggleAddSerieForm('')}
                      />
                    </Card>
                  </View>
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
  ({ categories, series, userAnswer, cards }: StoreState) => {
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
      categories,
      userAnswer,
      cards
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
