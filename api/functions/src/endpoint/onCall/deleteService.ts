import * as functions from 'firebase-functions'
import ServiceDBC from '../../dbc/ServiceDBC'
import SessionDBC from '../../dbc/SessionDBC'

export const deleteService = functions.https.onCall(async (data, context) => {
  // fetch service
  const service = await new ServiceDBC().fetch(data.id)
  if (service !== 'NOTFOUND') {
    // fetch all sessions associated with service
    service.sessionDocIdArray!.forEach(async (sessionId: string) => {
      const session = await new SessionDBC().fetch(sessionId)
      await session.ref!.delete()
    })
    // delete service
    await service.delete()
  }
  return 'ok'
})
