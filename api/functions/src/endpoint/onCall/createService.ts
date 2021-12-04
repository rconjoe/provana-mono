import * as functions from 'firebase-functions'
import ServiceDBC from '../../dbc/ServiceDBC'
import StripePriceService from '../../services/stripe/StripePriceService'

export const createService = functions.https.onCall(async (data, context) => {
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
  const price: string = await new StripePriceService().create(service.toModel())
  await service.updatePrice(price)
  return service.id
})
