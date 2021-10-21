import * as functions from 'firebase-functions'
import DisputeDBC from '../../dbc/DisputeDBC'
import SlotDBC from '../../dbc/SlotDBC'
import NotificationDBC from '../../dbc/NotificationDBC'

export const dispute = functions.https.onCall(async (data, context): Promise<void> => {
  const slot = await new SlotDBC().fromId(data.slot)
  await new DisputeDBC().initialize({
    slot: data.slot,
    buyer: data.buyer,
    details: data.details
  })
  await new NotificationDBC(
    slot.sellerUid!,
    'dispute',
    slot.name!,
  ).send()
  await slot.update({ status: 'disputed' })
})
