import * as functions from 'firebase-functions'
import { Invitation } from '../models/Invitation'

export const associateInvitation = functions.firestore.document('creators/{creator}').onCreate(async (snap):
Promise<FirebaseFirestore.WriteResult> => {
  const creatorData = snap.data()
  const invitation = new Invitation()
  invitation.code = creatorData.code
  invitation.uid = creatorData.uid
  return await invitation.associateUID()
})