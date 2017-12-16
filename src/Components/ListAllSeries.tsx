import React from 'react'
import { connect } from 'react-redux'
import { StoreState } from '../store'
import { SeriesList } from '../Components'
import { } from 'native-base'

const ListAllSeriesC = ({ series }: IConnectProps) => (
  <SeriesList series={series} onPress={() => null} />
)
const connectCreator = connect(
  ({ series }: StoreState) => {
    return {
      series
    }
  }
)
type IConnectProps = typeof connectCreator.allProps
export const ListAllSeries = connectCreator(ListAllSeriesC)
