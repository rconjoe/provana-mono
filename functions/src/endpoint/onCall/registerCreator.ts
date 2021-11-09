import * as functions from 'firebase-functions'
import Creator from '../../models/Creator'
import AuthUserService from '../../services/auth/AuthUserService'
import StripeCustomerService from '../../services/stripe/StripeCustomerService'
import StripeAccountService from '../../services/stripe/StripeAccountService'
import CreatorDBC from '../../dbc/CreatorDBC'
import UserFinder from '../../services/UserFinder'

export const registerCreator = functions.https.onCall(async (data, context): 
  Promise<'USERNAME_TAKEN'|'OK'> => {
  if (data === null || data === undefined) throw new Error('Null payload!')

  let usernameAvailable = await new UserFinder().usernameAvailable(data.username)
  if (usernameAvailable === false) return 'USERNAME_TAKEN'

  const creator = new Creator().setRegisterData(data.email, data.password, data.code, data.username)
  await new AuthUserService().registerCreator(creator)

  await new StripeCustomerService().newCreator(creator)
  await new StripeAccountService().create(creator)

  await new CreatorDBC().writeNew(creator)
  return 'OK'
})

