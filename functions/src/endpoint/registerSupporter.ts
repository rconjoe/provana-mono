import * as functions from 'firebase-functions'
import { Supporter } from '../models/Supporter'
import { AuthUserService } from '../services/auth/AuthUserService'
import { StripeCustomerService } from '../services/stripe/StripeCustomerService'
import { SupporterDBC } from '../dbc/SupporterDBC'


/**
 * @see https://getleaf.app/JosephCarlton/stepbystepa-01xddhel
 */
export const registerSupporter = functions.https.onCall(async (data, context) => {
  if (data === null || data === undefined) throw new Error('Null payload!')

  const supporter = new Supporter().setRegisterData(data.email, data.password, data.username)
  await new AuthUserService().registerSupporter(supporter)
  await new StripeCustomerService().newSupporter(supporter)
  await new SupporterDBC().writeNew(supporter)
  return 'ok'
})