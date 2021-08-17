import * as functions from 'firebase-functions'
import { CreatorDBC } from '../dbc/CreatorDBC'
import { StripeAccountService } from '../services/stripe/StripeAccountService'

export const stripeAccountOnboard = functions.https.onCall(async (data, context) => {
  const uid: string = data.uid
  const creator = await new CreatorDBC().fetchByUid(uid)
  if (creator.account === undefined || creator.account === "") throw new Error('Missing stripe account data!')
  return await new StripeAccountService().generateAccountLink(creator.account)
})