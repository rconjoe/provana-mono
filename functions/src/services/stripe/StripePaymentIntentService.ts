import Stripe from 'stripe'
import { stripe } from '../../config'

export default class StripePaymentIntentService {
  public async retrieve(id: string): Promise<Stripe.PaymentIntent> {
    return await stripe.paymentIntents.retrieve(id)
    .catch(err => {
      throw new Error(err)
    })
  }

  public async status(id: string): Promise<string> {
    const intent = await this.retrieve(id)
    return intent.status
  }

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
