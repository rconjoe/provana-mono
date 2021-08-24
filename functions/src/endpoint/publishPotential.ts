import * as functions from 'firebase-functions'
import PotentialDBC from '../dbc/PotentialDBC'

export const publishPotential = functions.https.onCall(async (data, context) => {
  const dbc = new PotentialDBC().setSellerUid(data.uid)
  await dbc.publishAll()
  .catch(err => functions.logger.error(err))
  return 'ok'
})