import { StyleSheet } from 'react-native'

export const baseStyle = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
    marginLeft: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
})
