import * as functions from 'firebase-functions'
import SessionDBC from '../../dbc/SessionDBC'

export const fetchSoldSessions = functions.https.onCall(async (data, context) => {
  return await new SessionDBC().fetchBooked(data.sellerUid)
})
