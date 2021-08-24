import * as functions from 'firebase-functions'
import SlotDBC from '../dbc/SlotDBC'

export const onSessionPublished = functions
  .firestore
  .document('sessions/{sessionId}')
  .onUpdate(async(change, context) => {
    const a = change.after.data()
    const b = change.before.data()
    const slots = a.slots
    if (b.status === 'potential' && a.status === 'published') {
      for(let i=0; i<slots; i++) {
        const _slot = i+1
        await new SlotDBC(
          "",
          a.name,
          _slot,
          a.slots,
          a.start,
          a.end,
          a.sellerUid,
          a.serviceDocId,
          "",
          "",
          "",
          'published',
          a.id,
          undefined
        ).publish()
      }
    }
  return
})