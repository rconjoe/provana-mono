import Stripe from 'stripe'
import { stripe } from '../../config'

export default class StripeCheckoutService {
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

  private fee(serviceCost: number): number {
    const cents = serviceCost * 100
    return cents * 0.2 // 20%
  }
}
