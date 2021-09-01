import * as functions from 'firebase-functions'
import { InvitationDBC } from '../..//dbc/InvitationDBC'

export const getOrCreateInvitation = functions.https.onCall(async (data, context): Promise<string> => {
  if (data === null || data === undefined) throw new Error('Null or undefined input.')

  const invitation = new InvitationDBC().setUser(data.discordUserID)
  return await invitation.getOrCreate()
})