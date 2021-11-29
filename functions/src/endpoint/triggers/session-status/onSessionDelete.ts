import * as functions from 'firebase-functions'
import ServiceDBC from '../../../dbc/ServiceDBC'

export const onSessionDelete = functions
  .firestore
  .document('sessions/{sessionId}')
  .onDelete(async (snap, context): Promise<void> => {
    await new ServiceDBC().removeSessionFromService(snap.data().serviceDocId, snap.id)
})
