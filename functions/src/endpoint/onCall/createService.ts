import * as functions from 'firebase-functions'
import { ServiceDBC } from '../../dbc/ServiceDBC'
import { StripePriceService } from '../../services/stripe/StripePriceService'

export const createService = functions.https.onCall(async (data, context) => {
  const service = new ServiceDBC().callData(
    data.serviceName,
    data.serviceCost,
    data.serviceDescription,
    data.serviceLength,
    data.attendees,
    data.tags,
    data.software,
    data.mandatoryFill,
    data.serviceColor,
    data.uid
  )
  await service.initialize()
  const price: string = await new StripePriceService().create(service.toModel())
  await service.updatePrice(price)
  return 'ok'
})
