import * as functions from 'firebase-functions'
import { CreatorDBC } from '../dbc/CreatorDBC'
import { StripeAccountService } from '../services/stripe/StripeAccountService'

export const stripeCompleteOnboard = functions.https.onCall(async (data, context) => {
  const uid: string = data.uid
  const creator = new CreatorDBC(uid)
  const accountId = await creator.fetchAccountId()
  const complete = await new StripeAccountService().verifyAccountCapabilities(accountId)
  return await creator.completeOnboard(complete)
})