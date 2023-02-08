import { useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyCwXXz_D_AmzT3R6ZC5DAt4pJj6PXh0cSU',
  authDomain: 'caremobi-8b5b9.firebaseapp.com',
  projectId: 'caremobi-8b5b9',
  storageBucket: 'caremobi-8b5b9.appspot.com',
  messagingSenderId: '521330485547',
  appId: '1:521330485547:web:9a9472beda42d60117fd6e',
}

const app = initializeApp(firebaseConfig)
const messaging = process.browser ? getMessaging(app) : null

export const FirebasePermission = () => {
  useEffect(() => {
    console.log('messaging', messaging)
    onMessage(messaging, (payload) => {
      console.log('message received. ', payload)
    })
  }, [])
  const onClick = () => {
    getToken(messaging, {
      vapidKey:
        'BDd9P2a5tHBEuADuUxRFsTC22G2lVnwHY2tB9tq8r0o_d67ZktZTng34V9-5DnehKaavrnhWn18l6_ocedDJO5s',
    }).then((token) => console.log('token', token))
    requestPermission()

    function requestPermission() {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.')
        }
      })
    }
  }
  return <button onClick={onClick}>Firebase Permission</button>
}
