import * as functions from 'firebase-functions'
import { Creator } from '../models/Creator'
import { AuthUserService } from '../services/auth/AuthUserService'
import { StripeCustomerService } from '../services/stripe/StripeCustomerService'
import { StripeAccountService } from '../services/stripe/StripeAccountService'
import { CreatorDBC } from '../dbc/CreatorDBC'

export const registerCreator = functions.https.onCall(async (data) => {
  if (data === null || data === undefined) throw new Error('Null payload!')

  const creator = new Creator().setRegisterData(data.email, data.password, data.code, data.username)
  const withUID = await new AuthUserService().registerCreator(creator)

  const withCustomer = await new StripeCustomerService().newCreator(withUID)
  const withAccount = await new StripeAccountService().create(withCustomer)
  await withAccount.associateInvitation()

  await new CreatorDBC().writeNew(creator)
  return 'ok'
})