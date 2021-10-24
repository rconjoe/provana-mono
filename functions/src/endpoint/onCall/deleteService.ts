import * as functions from 'firebase-functions'
import ServiceDBC from '../../dbc/ServiceDBC'

export const deleteService = functions.https.onCall(async (data, context) => {
  await new ServiceDBC(data.id).delete()
  return 'ok'
})
