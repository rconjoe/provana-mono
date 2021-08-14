import * as functions from 'firebase-functions'
import { Invitation } from '../models/Invitation'

/**
 * Returns boolean with invitation code validity.
 * @date 8/13/2021 - 10:16:57 PM
 *
 * @type {*}
 */
export const validateInvitation = functions.https.onCall(async (data): Promise<boolean> => {
  const code: string = data.code
  const invitation = new Invitation()
  invitation.code = code
  return await invitation.validate()
})