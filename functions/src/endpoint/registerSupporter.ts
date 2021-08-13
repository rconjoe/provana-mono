import * as functions from 'firebase-functions'
import { Supporter } from '../models/Supporter'
import { SupporterDBC } from '../dbc/SupporterDBC'
import { CreateUserService } from '../services/auth/CreateUserService'
import { CreateCustomerService } from '../services/stripe/CreateCustomerService'


/**
 * @see https://getleaf.app/JosephCarlton/stepbystepa-01xddhel
 */
export const registerSupporter = functions.https.onCall(async (data) => {
  if (data === null || data === undefined) throw new Error('Null payload!')

  const supporter = new Supporter().setRegisterData(data.email, data.password, data.username)
  const newUser = await new CreateUserService().create(supporter)
  supporter.temp = undefined
  supporter.uid = newUser.uid

  const newCustomer = await new CreateCustomerService().create(supporter)
  supporter.customer = newCustomer.id

  await new SupporterDBC().writeNew(supporter)
  return 'ok'
})