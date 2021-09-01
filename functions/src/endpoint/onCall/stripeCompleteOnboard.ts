import * as functions from 'firebase-functions'
import CreatorDBC from '../../dbc/CreatorDBC'
import { StripeAccountService } from '../../services/stripe/StripeAccountService'

export const stripeCompleteOnboard = functions.https.onCall(async (data, context): Promise<boolean|null> => {
  const dbc = new CreatorDBC().setUid(data.uid)
  const creator = await dbc.fetchByUid()
  const complete = await new StripeAccountService().verifyAccountCapabilities(creator.account!)
  complete ? (await dbc.completeOnboard(complete)) : null
  return complete
})