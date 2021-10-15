import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/firestore'
import 'firebase/storage'

const dc = {
  apiKey: "AIzaSyBBBrVHVYBo4Hrc3rtsdOaCjN33R-9ypjY",
  authDomain: "db-abstract.firebaseapp.com",
  projectId: "db-abstract",
  storageBucket: "db-abstract.appspot.com",
  messagingSenderId: "902848736944",
  appId: "1:902848736944:web:49998bcb0ba26d4001d575",
  measurementId: "G-MQKBZ5H9HT"
}

const pc = {
  apiKey: "AIzaSyBrEbP8JRWFWHkcCqNjmPfiCz0NtlWgJTg",
  authDomain: "chilly-6ccdc.firebaseapp.com",
  projectId: "chilly-6ccdc",
  databaseURL: "https://chilly-6ccdc.firebaseio.com",
  storageBucket: "chilly-6ccdc.appspot.com",
  messagingSenderId: "393498548686",
  appId: "1:393498548686:web:8762d2fff475d19477339f",
  measurementId: "G-SL591CBMTC"
}

let c;
const h = window.location.hostname

switch (h) {
  case 'provana':
    c = pc
    break;
  case 'chillynebula55':
    c = dc
    break;
  case 'localhost':
    c = dc
    break;
  case 'chilly6ccdc':
    c = pc
    break;
  default:
    c = dc;
}

firebase.initializeApp(c)
export const LOCAL_PERSISTENCE = firebase.auth.Auth.Persistence.LOCAL
export const NO_PERSISTENCE = firebase.auth.Auth.Persistence.NONE
export const auth = firebase.auth()
export const functions = firebase.functions()
export const db = firebase.firestore()
export const storage = firebase.storage()
if (process.env.NODE_ENV !== 'production') {
  auth.useEmulator('http://localhost:9099')
  functions.useEmulator('localhost', 5001)
  db.useEmulator('localhost', 8080)
  storage.useEmulator('localhost', 9199)
}
