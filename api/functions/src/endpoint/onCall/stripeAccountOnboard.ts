import * as functions from 'firebase-functions'
import CreatorDBC from '../../dbc/CreatorDBC'
import StripeAccountService from '../../services/stripe/StripeAccountService'

export const stripeAccountOnboard = functions.https.onCall(async (data, context) => {
  const dbc = new CreatorDBC().setUid(data.uid)
  const creator = await dbc.fetchByUid()
  return await new StripeAccountService().generateAccountLink(creator.account!)
})
