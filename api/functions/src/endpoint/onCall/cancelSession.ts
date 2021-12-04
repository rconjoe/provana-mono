import * as functions from 'firebase-functions'
import SessionDBC from '../../dbc/SessionDBC'

export const cancelSession = functions.https.onCall(async (data, context): Promise<void> => {
  const session = await new SessionDBC().fetch(data.id)
  await session.update({ status: 'cancelled' })
})
