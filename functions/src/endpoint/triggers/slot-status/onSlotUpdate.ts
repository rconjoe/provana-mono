import * as functions from 'firebase-functions'
import SlotDBC from '../../../dbc/SlotDBC'
import SlotStatusHandler from './SlotStatusHandler'

export const onSlotUpdate = functions
  .firestore
  .document('sessions/{sessionId}/slots/{slotId}')
  .onUpdate(async (change, context) => {
    const b = change.before.get('status')
    const _ = change.after.data()
    if (b === _.status) return
    const slot = new SlotDBC(
      _.id,
      _.name,
      _.slot,
      _.slots,
      _.mandatoryFill,
      _.start,
      _.end,
      _.sellerUid,
      _.serviceDocId,
      _.buyerUid,
      _.buyerUsername,
      _.paymentIntent,
      _.status,
      _.parentSession,
      change.after.ref
    )
    const handler = new SlotStatusHandler(slot, context)
    switch (b) {
      case 'published':
        await handler.published()
      case 'holding':
        await handler.holding()
      case 'booked':
        await handler.booked()
      case 'cancelled':
        await handler.cancelled()
      case 'active':
        await handler.active()
      case 'disputed':
        await handler.disputed()
    }
  })
