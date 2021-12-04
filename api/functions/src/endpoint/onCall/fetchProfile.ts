import * as functions from 'firebase-functions'
import UserFinder from '../../services/UserFinder'

export const fetchProfile = functions.https.onCall(async(data, context) => {
  return await new UserFinder().fetchByUsername(data.username)
})
