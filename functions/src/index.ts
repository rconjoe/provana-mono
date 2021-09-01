import * as functions from "firebase-functions";
import { db } from './config'

export const testFunc = functions.https.onCall(async (data, context) => {
  const uid = context.auth && context.auth.uid
  const message = data.message
  const write: FirebaseFirestore.DocumentReference =
    await db.collection('test-messages').add({message: message})

  return `${uid} said ${message}, and I wrote it to firestore at messages/${write.id}`
})

export { registerSupporter } from './endpoint/onCall/registerSupporter'
export { registerCreator } from './endpoint/onCall/registerCreator'
export { getOrCreateInvitation } from './endpoint/onCall/getOrCreateInvitation'
export { validateInvitation } from './endpoint/onCall/validateInvitation'
export { stripeAccountOnboard } from './endpoint/onCall/stripeAccountOnboard'
export { stripeCompleteOnboard } from './endpoint/onCall/stripeCompleteOnboard'
export { createService } from './endpoint/onCall/createService'
export { writeNewReview } from './endpoint/onCall/writeNewReview';
export { getRecentReviews } from './endpoint/onCall/getRecentReviews';
export { getReviewScore } from './endpoint/onCall/getReviewScore';
export { publishPotential } from './endpoint/onCall/publishPotential'
export { onSessionPublished } from './endpoint/triggers/session-status/onPublished'
export { onSlotPurchased } from './endpoint/triggers/slot-status/onPurchased'
