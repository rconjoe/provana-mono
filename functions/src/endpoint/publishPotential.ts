import * as functions from 'firebase-functions'
import SessionDBC from '../dbc/SessionDBC'

export const publishPotential = functions.https.onCall(async (data, context) => {
  const session = new SessionDBC().setSellerUid(data.uid)
  await session.publish()
  return 'ok'
})