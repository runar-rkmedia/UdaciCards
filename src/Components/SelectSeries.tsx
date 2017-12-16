import React from 'react'
import { Button, Text, View } from 'native-base'
import { Serie } from '../store'
// import { jssOS } from '../utils'
import { SeriesList } from './'

interface Props {
  series: {
    [s: string]: Serie
  }
  onValueChange: (serieId: string) => any
  onAdd?: () => any
  seriesId: string
}

interface State {
  expanded: boolean
}

export class SelectSeries extends React.Component<Props, State> {
  state = {
    expanded: false
  }
  toggleExpand = () => {
    this.setState((state) => ({
      ...state,
      expanded: !state.expanded
    }))
  }
  render() {
    const { props, state, toggleExpand } = this
    const { series, seriesId, onValueChange, onAdd } = props
    const { expanded } = state
    if (!Object.keys(series).length) {
      return (
        <Button onPress={onAdd}><Text>Add a Serie</Text></Button>
      )
    }
    if (expanded) {
      return (
        <View>
          <SeriesList
            {...{
              series,
              onPress: (id) => {
                toggleExpand()
                onValueChange(id)
              }
            }}
          />
          <Button onPress={onAdd}><Text>Add a Serie</Text></Button>
        </View>
      )
    }
    const serie = series[seriesId]
    return (
      <Button
        transparent={true}
        onPress={toggleExpand}
      ><Text>
        {serie ? serie.displayText : 'Select'}
      </Text>
      </Button>
    )

  }
}
