import * as functions from 'firebase-functions'
import SlotDBC from '../../dbc/SlotDBC'
import StripePaymentIntentService from '../../services/stripe/StripePaymentIntentService'

export const capture = functions.https.onRequest(async (req, res) => {
  const id = Buffer.from(req.body).toString('ascii')
  const slot = await new SlotDBC().fromId(id)
  if (slot.status !== 'active') {
    throw new Error(`Slot error: status ${slot.status}`)  
  } 
  const intent = await new StripePaymentIntentService().retrieve(slot.paymentIntent!)
  if (intent.status !== 'requires_capture') {
    throw new Error(`Intent error: status ${intent.status}`)
  }
  const captured = await new StripePaymentIntentService().capture(intent.id)
  if (captured.status !== 'succeeded') {
    throw new Error(`Payment failed! ${captured.id} status ${captured.status}`)
  }
  await slot.update({ status: 'succeeded' })
  res.sendStatus(200)
})
