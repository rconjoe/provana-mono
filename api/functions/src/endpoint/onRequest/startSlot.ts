import * as functions from 'firebase-functions'
import SlotDBC from '../../dbc/SlotDBC'
import StripePaymentIntentService from '../../services/stripe/StripePaymentIntentService'

export const startSlot = functions.https.onRequest(async (req, res) => {
  const id = Buffer.from(req.body).toString('ascii')
  const slot = await new SlotDBC().fromId(id)
  if (slot.status! !== 'booked') {
    throw new Error(`Slot status wrong: ${slot.status}`)
  }
  const intent = await new StripePaymentIntentService().retrieve(slot.paymentIntent!)
  if (intent.status !== 'requires_capture') {
    throw new Error(`Intent status wrong: ${intent.status}`)
  }
  await slot.update({ status: 'active' })
  res.sendStatus(200)
})
