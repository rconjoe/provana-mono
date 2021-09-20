import * as functions from 'firebase-functions'
import SlotStatusHandler from './SlotStatusHandler'

export const onSlotUpdate = functions
  .firestore
  .document('sessions/{sessionId}/slots/{slotId}')
  .onUpdate(async (change, context) => {
    await new SlotStatusHandler().run(change)
  })
