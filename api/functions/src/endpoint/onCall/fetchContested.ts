import * as functions from 'firebase-functions'
import SlotDBC from '../../dbc/SlotDBC'
import Slot from '../../models/Slot'

export const fetchContested = functions.https.onCall(async (data, context):
  Promise<Array<Slot>|'UNAUTHORIZED'> => {
  return await new SlotDBC().fetchAllDisputed()
})
