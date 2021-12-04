import * as functions from 'firebase-functions'
import SlotDBC from '../../dbc/SlotDBC'

export const cancelSlot = functions.https.onCall(async (data, context): Promise<void> => {
  const slot = await new SlotDBC().fromId(data.id)
  await slot.update({ status: 'cancelled' })
})
