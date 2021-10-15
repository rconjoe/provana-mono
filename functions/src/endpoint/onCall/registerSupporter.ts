import * as functions from 'firebase-functions'
import Supporter from '../../models/Supporter'
import AuthUserService from '../../services/auth/AuthUserService'
import StripeCustomerService from '../../services/stripe/StripeCustomerService'
import SupporterDBC from '../../dbc/SupporterDBC'
import DiscordLink from '../../models/DiscordLink'

/**
 * @see https://getleaf.app/JosephCarlton/stepbystepa-01xddhel
 */
export const registerSupporter = functions.https.onCall(async (data, context) => {
  if (data === null || data === undefined) throw new Error('Null payload!')
 
  // This is a stinky, dirty, silly hack to get quick discord integration in before launch.
  const discord = new DiscordLink().generate()

  const supporter = new Supporter().setRegisterData(data.email, data.password, data.username, discord)
  await new AuthUserService().registerSupporter(supporter)
  await new StripeCustomerService().newSupporter(supporter)
  await new SupporterDBC().writeNew(supporter)
  return 'ok'
})
