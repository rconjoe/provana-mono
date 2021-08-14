import * as functions from 'firebase-functions'
import { Invitation } from '../models/Invitation'

export const getOrCreateInvitation = functions.https.onCall(async (data): Promise<string> => {
  if (data === null || data === undefined) throw new Error('Null or undefined input.')

  const dUser: string = data.discordUserID
  const invitation = await new Invitation(dUser).getOrCreate()
  return invitation.code!
})