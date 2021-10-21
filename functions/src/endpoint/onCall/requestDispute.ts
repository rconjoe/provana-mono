import * as functions from 'firebase-functions'
import DiscordLinkDBC from '../../dbc/DiscordLinkDBC'
import AuthUserService from '../../services/auth/AuthUserService'
import SlotDBC from '../../dbc/SlotDBC'
import DisputeQueryResponse from '../../models/DisputeQueryResponse'

// While this is very hacky (the discord part) it's the quickest way to handle the
// few requests that will be coming from the bot
export const requestDispute = functions.https.onCall(async (data, context): 
  Promise<DisputeQueryResponse|'NOTFOUND'> => {
  // if (context.auth!.uid !== 'uid-of-bot-user') throw new HttpsError('permission-denied', 'UNAUTHORIZED')
  const uid = await new DiscordLinkDBC().getUid(data.discordId)
  if (uid === 'NOTFOUND') return uid
  const authUser = await new AuthUserService().getUser(uid)
  const disputable = await new SlotDBC().activeFromUid(authUser.uid)
  const resp: DisputeQueryResponse = {
    uid: uid,
    username: authUser.displayName!,
    slots: disputable
  }
  return resp
})
