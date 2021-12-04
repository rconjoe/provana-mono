import * as functions from 'firebase-functions'
import SlotDBC from '../../dbc/SlotDBC'
import DisputeDBC from '../../dbc/DisputeDBC'

export const fetchDisputedSlot = functions.https.onCall(async (data, context) => {
  const slot = await new SlotDBC().fromId(data.slotId)
  const dispute = await new DisputeDBC(data.slotId).fetch()
  return {
    slot: slot.toModel(),
    dispute: dispute
  }
})
