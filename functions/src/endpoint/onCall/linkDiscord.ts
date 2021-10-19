import * as functions from 'firebase-functions'
import Supporter from '../../models/Supporter'
import SupporterDBC from '../../dbc/SupporterDBC'

export const linkDiscord = functions.https.onCall(async (data, context): Promise<Supporter|string> => {
  const invalid = await new SupporterDBC().discordLinkExists(data.code)
  if (invalid) {
    return 'NOTFOUND'
  }
  else return await new SupporterDBC().updateDiscord(data.code, data.discordId)
})
