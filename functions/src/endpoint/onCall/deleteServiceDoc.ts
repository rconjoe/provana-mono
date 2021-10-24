import * as functions from 'firebase-functions'
import ServiceDBC from '../../dbc/ServiceDBC'

export const deleteServiceDoc = functions.https.onCall(async (data, context) => {
    const service = new ServiceDBC(
        data.id
      )
      await service.deleteService(data.id)
      return 'ok'
})