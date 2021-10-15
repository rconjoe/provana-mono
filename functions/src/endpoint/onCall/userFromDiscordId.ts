import * as functions from 'firebase-functions'
// import {HttpsError} from 'firebase-functions/v1/https'
import InvitationDBC from '../../dbc/InvitationDBC'
import AuthUserService from '../../services/auth/AuthUserService'
import SlotDBC from '../../dbc/SlotDBC'

export const userFromDiscordId = functions.https.onCall(async (data, context) => {
  // if (context.auth!.uid !== 'uid-of-bot-user') throw new HttpsError('permission-denied', 'UNAUTHORIZED')
  const uid = await new InvitationDBC(data.id).fetchUid()
  const authUser = await new AuthUserService().getUser(uid)
  const slots = await new SlotDBC().activeFromUid(authUser.uid)
  const user = {
    uid: authUser.uid,
    username: authUser.displayName!,
    slots: slots
  }
  return user
})
