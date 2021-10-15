import * as functions from 'firebase-functions'
import SupporterDBC from '../../dbc/SupporterDBC'
import Supporter from '../../models/Supporter'

export const linkDiscord = functions.https.onCall(async (data, context): Promise<Supporter> => {
  const supporter = await new SupporterDBC().fetchByDiscord(data.code)
  return await supporter.updateDiscord(data.discordId)
})
