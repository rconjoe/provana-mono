import * as functions from 'firebase-functions'
import SlotDBC from '../../../dbc/SlotDBC'

export const onDisputeCreate = functions.firestore
  .document('disputes/{disputeId}')
  .onCreate(async (snap, context): Promise<void> => {
    const data = snap.data()

    // fire persistent notification to seller here
  
    const slot = await new SlotDBC().fromId(data.slot)
    await slot.update({ status: 'disputed' })
  })
