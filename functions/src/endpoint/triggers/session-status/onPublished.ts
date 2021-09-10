import * as functions from 'firebase-functions'
import SlotDBC from '../../../dbc/SlotDBC'
import ChatRoomDBC from '../../../dbc/ChatRoomDBC'

export const onSessionPublished = functions
  .firestore
  .document('sessions/{sessionId}')
  .onUpdate(async(change, context): Promise<void> => {
    const a = change.after.data()
    const b = change.before.data()
    const slots = a.slots
    if (b.status === 'potential' && a.status === 'published') {
      for(let i=1; i<=slots; i++) {
        await new SlotDBC(
          "",
          a.name,
          i,
          a.slots,
          a.mandatoryFill,
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
      await new ChatRoomDBC().initialize({
        id: a.id,
        creator: a.sellerUid,
        title: a.name
      })
    }
})
