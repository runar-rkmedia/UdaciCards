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
  },
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
})

export const inputProps = {
  underline: true,
  floatingLabel: true,
}
