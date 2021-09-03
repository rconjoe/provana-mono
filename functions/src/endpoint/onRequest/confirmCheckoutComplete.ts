import * as functions from 'firebase-functions'
import StripePaymentIntentService from '../../services/stripe/StripePaymentIntentService'
import SlotDBC from '../../dbc/SlotDBC'

export const confirmCheckoutComplete = functions.https.onRequest(async (req, res) => {
  const id = Buffer.from(req.body).toString('ascii')
  const slot = await new SlotDBC().fromId(id)
  if (!slot.paymentIntent) return
  else {
    const status = await new StripePaymentIntentService().status(slot.paymentIntent)
    if (status === 'requires_capture') return
    else {
      await new StripePaymentIntentService().cancel(slot.paymentIntent)
      await slot.update({
        status: 'published',
        paymentIntent: '',
        buyerUsername: '',
        buyerUid: ''
      })
      .catch(err => {
        throw new Error(err)
      })
    }
    res.sendStatus(200)
  }
})