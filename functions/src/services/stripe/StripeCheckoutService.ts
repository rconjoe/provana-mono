import Stripe from 'stripe'
import { stripe } from '../../config'


/**
 * Export for the StripeCheckoutService class
 *
 * @class StripeCheckoutService
 * @typedef {StripeCheckoutService}
 * @module StripeCheckoutService
 * @category src
 * @subcategory services/stripe
 */
export default class StripeCheckoutService {

  
  /**
   *  Creates the session object for the user to check out by calling the Stripe Checkout api and takes an object with the uid, username, Creator's Stripe custmer id, Creator's Stripe account id,
   *  the price on Stripe's end, cost of the service, the Firestore slot document id, and the Firestore session document id.
   *  
   *
   * @public
   * @async
   * @param {{
      uid: string,
      username: string,
      customer: string,
      account: string,
      price: string,
      serviceCost: number,
      slotId: string,
      sessionId: string
    }} data
   * @returns {Promise<Stripe.Checkout.Session>}
   */
  public async createCheckout(data: {
    uid: string,
    username: string,
    customer: string,
    account: string,
    price: string,
    serviceCost: number,
    slotId: string,
    sessionId: string
  }): Promise<Stripe.Checkout.Session> {
    return await stripe.checkout.sessions.create({
      success_url: "http://localhost:8080/paymentSuccess?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:8080/cancelTransaction",
      mode: "payment",
      payment_method_types: ['card'],
      line_items: [
        {
          price: data.price,
          quantity: 1
        }
      ],
      client_reference_id: data.uid,
      customer: data.customer,
      payment_intent_data: {
        application_fee_amount: this.fee(data.serviceCost),
        capture_method: 'manual',
        setup_future_usage: 'on_session',
        transfer_data: {
          destination: data.account
        },
        metadata: {
          slotId: data.slotId
        },
        statement_descriptor: `${data.username}`
      },
      metadata: {
        slotId: data.slotId
      },
    })
    .catch(err => {
      throw new Error(err)
    })
  }

  
  /**
   * Takes the cost of the service and converts it to the cost in pennies, and then returns 20% of that number
   *
   * @private
   * @param {number} serviceCost
   * @returns {number}
   */
  private fee(serviceCost: number): number {
    const cents = serviceCost * 100
    return cents * 0.2 // 20%
  }

  
  /**
   * Calls the Stripe Checkout api and returns the checkout session object
   *
   * @public
   * @async
   * @param {string} id
   * @returns {unknown}
   */
  public async retrieve(id: string) {
    return await stripe.checkout.sessions.retrieve(id)
      .catch(err => {
        throw new Error(err)
      })
  }
}
