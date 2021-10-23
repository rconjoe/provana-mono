import * as functions from 'firebase-functions'
import UserFinder from '../../services/UserFinder'

export const fetchUser = functions.https.onCall(async (data, context) => {
  return await new UserFinder(data.uid).fetch()
})
