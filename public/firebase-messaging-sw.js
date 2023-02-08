importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js')

firebase.initializeApp({
  apiKey: 'AIzaSyCwXXz_D_AmzT3R6ZC5DAt4pJj6PXh0cSU',
  authDomain: 'caremobi-8b5b9.firebaseapp.com',
  projectId: 'caremobi-8b5b9',
  storageBucket: 'caremobi-8b5b9.appspot.com',
  messagingSenderId: '521330485547',
  appId: '1:521330485547:web:9a9472beda42d60117fd6e',
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  )
  // Customize notification here
  const notificationTitle = 'Background Message Title'
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
