import * as functions from 'firebase-functions'
import DisputeDBC from '../../dbc/DisputeDBC'

export const dispute = functions.https.onCall(async (data, context): Promise<void> => {
  await new DisputeDBC().initialize({
    slot: data.slot,
    buyer: data.buyer,
    details: data.details
  })
})
