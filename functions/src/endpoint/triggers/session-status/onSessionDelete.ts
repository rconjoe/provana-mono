import * as functions from 'firebase-functions'
import ServiceDBC from '../../../dbc/ServiceDBC'
import SlotDBC from '../../../dbc/SlotDBC'

export const onSessionDelete = functions
  .firestore
  .document('sessions/{sessionId}')
  .onDelete(async (snap, context): Promise<void> => {
    await new ServiceDBC().removeSessionFromService(snap.data().serviceDocId, snap.id)
    const slots = await new SlotDBC().fromParent(snap.id)
    slots.forEach(async (slot: SlotDBC) => {
      await slot.ref!.delete()
    })
})
