import { Creator } from '../../models/Creator'
import { Supporter } from '../../models/Supporter'
import { stripe } from '../../config'


export class StripeCustomerService {
  public async create(_newCustomer: Creator | Supporter): Promise<Creator | Supporter> {
    const customer = await stripe.customers.create({
      email: _newCustomer.email,
      metadata: {
        uid: _newCustomer.uid!
      }
    })
    .catch((err) => {
      throw new Error(err)
    })
    _newCustomer.customer = customer.id
    return _newCustomer
  }
}