import Creator from '../../models/Creator'
import Supporter from '../../models/Supporter'
import { stripe } from '../../config/config'


/**
 * Export for the StripeCUstomerService class
 *
 * @class StripeCustomerService
 * @typedef {StripeCustomerService}
 * @module StripeCustomerService
 * @category src
 * @subcategory services/stripe
 */
export default class StripeCustomerService {

  
  /**
   * Takes a Supporter object and calls the Stripe Customer api to create a new stripe customer account and puts the Stripe customer id into the supporter object in the id property, then returns the updated Supporter object
   *
   * @public
   * @async
   * @param {Supporter} _newCustomer
   * @returns {Promise<Supporter>}
   */
  public async newSupporter(_newCustomer: Supporter): Promise<Supporter> {
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

  
  /**
   * Takes a Creator object and then calls the Stripe Customer api to create a new Stripe customer account, then it takes the new Stripe customer id and saves it to the customer object in the id property and returns the Customer object
   * @date 9/17/2021 - 10:09:44 AM
   *
   * @public
   * @async
   * @param {Creator} _newCustomer
   * @returns {Promise<Creator>}
   */
  public async newCreator(_newCustomer: Creator): Promise<Creator> {
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
