import * as functions from 'firebase-functions'
import StripeCheckoutService from '../../services/stripe/StripeCheckoutService'
import SlotDBC from '../../dbc/SlotDBC'
import TaskService from '../../services/TaskService'

export const checkout = functions.https.onCall(async (data, context): Promise<string> => {
  const checkout = await new StripeCheckoutService().createCheckout({
    uid: data.uid,
    username: data.username,
    customer: data.customer,
    account: data.account,
    price: data.price,
    serviceCost: data.serviceCost,
    slotId: data.slotId,
    sessionId: data.sessionId
  })
  const slot = await new SlotDBC().fromPath(data.sessionId, data.slotId)
  await slot.update({
    status: 'holding',
    paymentIntent: checkout.payment_intent,
    buyerUid: data.uid,
    buyerUsername: data.username
  })
  await new TaskService().onCheckout(slot.id!)
  return checkout.id
})
