import * as admin from 'firebase-admin'
admin.initializeApp()
export const auth = admin.auth()
export const db = admin.firestore()
const settings = { timestampsInSnapshots: true }
db.settings(settings)
