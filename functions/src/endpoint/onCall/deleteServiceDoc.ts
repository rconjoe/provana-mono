import * as functions from 'firebase-functions'
import ServiceDBC from '../../dbc/ServiceDBC'

export const deleteServiceDoc = functions.https.onCall(async (data, context) => {
    const service = new ServiceDBC(
        "",
        data.serviceName,
        data.serviceDescription,
        data.terms,
        data.serviceCost, 
        data.serviceLength, 
        data.tags, 
        data.color, 
        data.software, 
        data.attendees, 
        data.mandatoryFill,
        [], 
        data.uid
      )
      await service.initialize()
      await service.deleteService()
      return 'ok'
})