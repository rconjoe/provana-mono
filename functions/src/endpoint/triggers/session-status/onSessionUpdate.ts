import * as functions from 'firebase-functions'
import SessionStatusHandler from './SessionStatusHandler'

export const onSessionUpdate = functions
  .firestore
  .document('sessions/{sessionId}')
  .onUpdate(async (change, context) => {
    await new SessionStatusHandler().run(change)
  })
