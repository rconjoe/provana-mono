import * as functions from 'firebase-functions'
import SlotDBC from '../../dbc/SlotDBC'

export const fetchSoldSlots = functions.https.onCall(async (data, context) => {
  return await new SlotDBC().fetchSold(data.sellerUid)
})
