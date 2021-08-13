import * as functions from 'firebase-functions'
import { Supporter } from '../models/Supporter'
import { SupporterDBC } from '../dbc/SupporterDBC'
import { SupporterAuthService } from '../services/auth/SupporterAuthService'
import { StripeCustomerService } from '../services/stripe/StripeCustomerService'


/**
 * @see https://getleaf.app/JosephCarlton/stepbystepa-01xddhel
 */
export const registerSupporter = functions.https.onCall(async (data) => {
  if (data === null || data === undefined) throw new Error('Null payload!')

  const supporter = new Supporter().setRegisterData(data.email, data.password, data.username)
  await new SupporterAuthService().create(supporter)

  await new StripeCustomerService().create(supporter)

  await new SupporterDBC().writeNew(supporter)
  return 'ok'
})