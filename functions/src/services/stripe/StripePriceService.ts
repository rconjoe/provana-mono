import Service from '../../models/Service'
import StripeProductService from './StripeProductService'
import { stripe } from '../../config'


/**
 * Export for the StripePriceService class
 *
 * @class StripePriceService
 * @typedef {StripePriceService}
 * @module StripePriceService
 * @category src
 * @subcategory services/stripe
 */
export default class StripePriceService {

  
  /**
   * Takes a service object and uses a StripeProductService class to create a new product on stripe, and then calls the stripe prices api and creates a new price for the product and returns the price object id
   *
   * @public
   * @async
   * @param {Service} service
   * @returns {Promise<string>}
   */
  public async create(service: Service): Promise<string> {
    const product = await new StripeProductService().create(service)
    const price = await stripe.prices.create({
      currency: "usd",
      unit_amount: service.serviceCost! * 100,
      product: product.id
    })
    .catch((err) => {
      throw new Error(err)
    })
    return price.id
  }
}
