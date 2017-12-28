import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

type repeatT = 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year' | undefined

interface UdaciCardsNotificationsI {
  KEY: string,
  localNotification: () => Notifications.LocalNotification,
  time: () => Date
  repeat?: repeatT
}

class UdaciCardsNotifications {
  time: () => Date
  repeat: repeatT
  localNotification: () => Notifications.LocalNotification
  private KEY: string

  constructor({ KEY, localNotification, time, repeat }: UdaciCardsNotificationsI) {
    this.KEY = KEY
    this.localNotification = localNotification
    this.time = time
    this.repeat = repeat
  }
  clear = () => {
    return AsyncStorage.removeItem(this.KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
  }
  create = () => this.localNotification()
  set = () => {
    AsyncStorage.getItem(this.KEY)
      .then(JSON.parse)
      .then((data) => {
        if (!data) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }: Permissions.PermissionResponse) => {
              if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()
                Notifications.scheduleLocalNotificationAsync(
                  this.create(),
                  {
                    time: this.time(),
                    repeat: this.repeat
                  }
                )
                AsyncStorage.setItem(this.KEY, JSON.stringify(true))
              }
            })
        }
      })
  }
}

export const udaciCardsNotifications = new UdaciCardsNotifications({
  KEY: 'UdaciCardsRunar:Notifications',
  localNotification: () => {
    return {
      title: 'Study your FlashCards',
      body: `Study hard, and conquer the world!`,
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true
      }
    }
  },
  time: () => {
    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(20)
    tomorrow.setMinutes(0)
    tomorrow.setSeconds(0)
    return tomorrow
  },
  // repeat: 'day'
}
)
