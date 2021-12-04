import * as functions from 'firebase-functions'
import StripeCheckoutService from '../../services/stripe/StripeCheckoutService'
import StripePaymentIntentService from '../../services/stripe/StripePaymentIntentService'
import SlotDBC from '../../dbc/SlotDBC'

export const checkoutComplete = functions.https.onCall(async (data, context): Promise<string> => {
  const session = await new StripeCheckoutService().retrieve(data.checkoutId)
  const intent = await new StripePaymentIntentService().retrieve(session.payment_intent!.toString())
  const slot = await new SlotDBC().fromId(intent.metadata.slotId)
  if (intent.status === 'requires_capture') {
    await slot.update({
      status: 'booked'
    })
    return 'booked'
  }
  else {
    await new StripePaymentIntentService().cancel(intent.id)
    await slot.update({
      status: 'published',
      paymentIntent: '',
      buyerUsername: '',
      buyerUid: ''
    })
    return 'failure'
  }
})
