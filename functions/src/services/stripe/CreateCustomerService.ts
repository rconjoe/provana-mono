import { Creator } from '../../models/Creator'
import { Supporter } from '../../models/Supporter'
import { stripe } from '../../config'
import Stripe from 'stripe'


export class CreateCustomerService {
  public async create(_newCustomer: Creator | Supporter): Promise<Stripe.Customer> {
    return await stripe.customers.create({
      email: _newCustomer.email,
      metadata: {
        uid: _newCustomer.uid!
      }
    })
    .catch((err) => {
      throw new Error(err)
    })
  }
}