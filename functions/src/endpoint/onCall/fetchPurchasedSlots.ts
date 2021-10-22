import * as functions from 'firebase-functions'
import SlotDBC from '../../dbc/SlotDBC'

export const fetchPurchasedSlots = functions.https.onCall(async (data, context) => {
  return await new SlotDBC().fetchPurchased(data.buyerUid)
})
