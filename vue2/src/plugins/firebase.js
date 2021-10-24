import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/firestore'
import 'firebase/storage'
import { config } from './config'

firebase.initializeApp(config)
export const LOCAL_PERSISTENCE = firebase.auth.Auth.Persistence.LOCAL
export const NO_PERSISTENCE = firebase.auth.Auth.Persistence.NONE
export const auth = firebase.auth()
export const functions = firebase.functions()
export const db = firebase.firestore()
export const storage = firebase.storage()
if (window.location.hostname === 'localhost') {
  auth.useEmulator('http://localhost:9099')
  functions.useEmulator('localhost', 5001)
  db.useEmulator('localhost', 8080)
  storage.useEmulator('localhost', 9199)
}
