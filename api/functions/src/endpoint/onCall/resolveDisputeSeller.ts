import * as functions from 'firebase-functions'
import SlotDBC from '../../dbc/SlotDBC'

export const resolveDisputeSeller = functions.https.onCall(async (data, context) => {
  await new SlotDBC(data.slotId).resolve('seller')
})
