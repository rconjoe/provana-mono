import * as functions from 'firebase-functions'
import InvitationDBC from '../../dbc/InvitationDBC'

/**
 * Returns boolean with invitation code validity.
 */
export const validateInvitation = functions.https.onCall(async (data, context): Promise<boolean|'NOTFOUND'> => {
  const invitation = new InvitationDBC().setCode(data.code)
  return await invitation.validate()
})
