import * as functions from 'firebase-functions'
import SlotDBC from '../../dbc/SlotDBC'
import StripePaymentIntentService from '../../services/stripe/StripePaymentIntentService'

export const release = functions.https.onRequest(async (req, res) => {
  const id = Buffer.from(req.body).toString('ascii')
  const slot = await new SlotDBC().fromId(id)
  const intent = await new StripePaymentIntentService().retrieve(slot.paymentIntent!)
  if (intent.status !== 'requires_capture') {
    throw new Error(`Intent error: status ${intent.status}`)
  }
  const released = await new StripePaymentIntentService().cancel(intent.id)
  if (released.status !== 'canceled') {
    throw new Error(`Release failed! ${released.id} status ${released.status}`)
  }
  await slot.update({ status: 'cancelled' })
  res.sendStatus(200)
})
