import { Platform, ViewStyle } from 'react-native'
import { CardTypes } from '../store'

const PLATFORM = Platform.OS

export function OS({ ios, android }: { ios: any, android: any }) {
  switch (PLATFORM) {
    case 'ios':
      return ios
    case 'android':
      return android
    default:
      return android || ios
  }
}

export function jssOS({ ios, android }: { ios: ViewStyle, android: ViewStyle }) {
  return OS({ ios, android })
}

export const isNumber = (n: any) => {
  return !isNaN(parseFloat(n)) && isFinite(n)
}
