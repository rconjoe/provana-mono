import { Service } from '../../models/Service'
import { stripe } from '../../config'
import Stripe from 'stripe'

export class StripeProductService {
  public async create(service: Service): Promise<Stripe.Response<Stripe.Product>> {
    if (!service.serviceName || !service.id) throw new Error('name and service ID required')
    return await stripe.products.create({
      name: service.serviceName,
      description: service.serviceDescription,
      metadata: {
        service: service.id
      }
    })
    .catch((err) => {
      throw new Error(err)
    })
  }
}