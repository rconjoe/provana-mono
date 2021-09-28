import * as functions from 'firebase-functions'
import SlotDBC from '../../dbc/SlotDBC'
import CancellationDBC from '../../dbc/CancellationDBC'

export const cancelSlot = functions.https.onCall(async (data, context): Promise<void> => {
  const slot = await new SlotDBC().fromId(data.id)
  await new CancellationDBC(slot.toModel()).create(data.uid)
  await slot.update({ status: 'cancelled' })
})
