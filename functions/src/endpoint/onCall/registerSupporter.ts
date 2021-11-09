import * as functions from 'firebase-functions'
import Supporter from '../../models/Supporter'
import AuthUserService from '../../services/auth/AuthUserService'
import StripeCustomerService from '../../services/stripe/StripeCustomerService'
import SupporterDBC from '../../dbc/SupporterDBC'
import DiscordLink from '../../models/DiscordLink'
import UserFinder from '../../services/UserFinder'

export const registerSupporter = functions.https.onCall(async (data, context):
  Promise<'USERNAME_TAKEN'|'OK'> => {
  if (data === null || data === undefined) throw new Error('Null payload!')

  let usernameAvailable = await new UserFinder().usernameAvailable(data.username)
  if (usernameAvailable === false) return 'USERNAME_TAKEN'
 
  // This is a stinky, dirty, silly hack to get quick discord integration in before launch.
  const discord = new DiscordLink().generate()

  const supporter = new Supporter().setRegisterData(data.email, data.password, data.username, discord)
  await new AuthUserService().registerSupporter(supporter)
  await new StripeCustomerService().newSupporter(supporter)
  await new SupporterDBC().writeNew(supporter)
  return 'OK'
})
