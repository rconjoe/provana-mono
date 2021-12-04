import * as functions from 'firebase-functions'
import DiscordLinkDBC from '../../dbc/DiscordLinkDBC'
import AuthUserService from '../../services/auth/AuthUserService'
import DisputeQueryResponse from '../../models/DisputeQueryResponse'
import SlotDBC from '../../dbc/SlotDBC'

export const fetchDisputesBySeller = functions.https.onCall(async (data, context):
  Promise<DisputeQueryResponse|'NOTFOUND'> => {
  const uid = await new DiscordLinkDBC().getUid(data.discordId)
    if (uid === 'NOTFOUND') return uid
    const authUser = await new AuthUserService().getUser(uid)
    const disputed = await new SlotDBC().disputedOfSeller(authUser.uid)
    const resp: DisputeQueryResponse = {
      uid: uid,
      username: authUser.displayName!,
      slots: disputed
    }
    return resp
})
