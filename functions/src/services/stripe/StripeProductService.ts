import Service from '../../models/Service'
import { stripe } from '../../config'
import Stripe from 'stripe'


/**
 * Export for StripeProductService class
 * 
 * @class StripeProductService
 * @typedef {StripeProductService}
 * @module StripePriceService
 * @category src
 * @subcategory services/stripe
 */
export default class StripeProductService {

  
  /**
   * Takes a service object, and calls the Stripe product api to create a new product on stripe to be used a supporter is going through the checkout flow, returns a product object
   * @date 9/17/2021 - 10:49:51 AM
   *
   * @public
   * @async
   * @param {Service} service
   * @returns {Promise<Stripe.Response<Stripe.Product>>}
   */
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
