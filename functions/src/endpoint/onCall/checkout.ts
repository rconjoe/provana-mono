import * as functions from 'firebase-functions'
import StripeCheckoutService from '../../services/stripe/StripeCheckoutService'
// import SlotDBC from '../../dbc/SlotDBC'

export const checkout = functions.https.onCall(async (data, context) => {
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
  // const slot = await new SlotDBC().fromPath(data.sessionId, data.slotId)
  // await slot.update({
  //   status: 'holding',
  //   paymentIntent: checkout.payment_intent,
  //   buyerUid: data.buyerUid,
  //   buyerUsername: data.buyerUsername
  // })

  // schedule task here

  return checkout.id
})