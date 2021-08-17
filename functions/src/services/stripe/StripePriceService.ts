import { Service } from '../../models/Service'
import { StripeProductService } from './StripeProductService'
import { stripe } from '../../config'

export class StripePriceService {
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