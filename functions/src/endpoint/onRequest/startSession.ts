import * as functions from 'firebase-functions'
import SessionDBC from '../../dbc/SessionDBC'
import SlotDBC from '../../dbc/SlotDBC'
import StripePaymentIntentService from '../../services/stripe/StripePaymentIntentService'

export const startSession = functions.https.onRequest(async (req, res) => {
  const id = Buffer.from(req.body).toString('ascii')
  const session = await new SessionDBC().fetch(id)
  if (session.status !== 'full') {
    throw new Error(`Slot status wrong: ${session.status}`)
  }
  const slots = await new SlotDBC().fetchByParent(id)
  slots.forEach(async (slot) => {
    if (slot.status! !== 'booked') {
      throw new Error(`Slot status wrong: ${slot.status}`)
    }
    const intent = await new StripePaymentIntentService().retrieve(slot.paymentIntent!)
    if (intent.status !== 'requires_capture') {
      throw new Error(`Intent status wrong: ${intent.status}`)
    }
    slot.update({ status: 'active' })
  })
  await session.update({ status: 'active' })
  res.sendStatus(200)
})
