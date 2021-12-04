import * as functions from 'firebase-functions'
import SlotDBC from '../../dbc/SlotDBC'
import DisputeDBC from '../../dbc/DisputeDBC'

export const resolveDispute = functions.https.onCall(async (data, context):
  Promise<void> => {
    const slot = await new SlotDBC().fromId(data.slot)
    await new DisputeDBC(data.slot).update({
      status: data.resolution,
      staff: data.staff
    })
    await slot.update({ status: data.resolution })
})
