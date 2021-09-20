import Stripe from 'stripe'
import { stripe } from '../../config'


/**
 * export for the StripePaymentIntentService class
 *
 * @class StripePaymentIntentService
 * @typedef {StripePaymentIntentService}
 * @module StripePaymentIntentService
 * @category src
 * @subcategory services/stripe
 */
export default class StripePaymentIntentService {

  
  /**
   * Takes the id of a stripe checkout session object and returns the paymentIntent for that checkout session
   *
   * @public
   * @async
   * @param {string} id
   * @returns {Promise<Stripe.PaymentIntent>}
   */
  public async retrieve(id: string): Promise<Stripe.PaymentIntent> {
    return await stripe.paymentIntents.retrieve(id)
    .catch(err => {
      throw new Error(err)
    })
  }

  
  /**
   *  Takes the id of a Stripe checkout session object, and retruns the current status of a payment intent, calls this.retrieve()
   *
   * @public
   * @async
   * @param {string} id
   * @returns {Promise<string>}
   */
  public async status(id: string): Promise<string> {
    const intent = await this.retrieve(id)
    return intent.status
  }

  
  /**
   * Takes the id of a stripe checkout session object, and calls the stripe paymentIntent api to cancel the payment intent
   *
   * @public
   * @async
   * @param {string} id
   * @returns {Promise<void>}
   */
  public async cancel(id: string): Promise<void> {
    await stripe.paymentIntents.cancel(id)
    .catch(err => {
      throw new Error(err)
    })
  }

  public async capture(id: string): Promise<Stripe.PaymentIntent> {
    return await stripe.paymentIntents.capture(id)
    .catch(err => {
      throw new Error(err)
    })

  }
}
