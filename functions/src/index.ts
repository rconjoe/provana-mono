import * as functions from "firebase-functions";
import { db } from './config'

export const testFunc = functions.https.onCall(async (data, context) => {
  const uid = context.auth && context.auth.uid
  const message = data.message
  const write: FirebaseFirestore.DocumentReference =
    await db.collection('test-messages').add({message: message})

  return `${uid} said ${message}, and I wrote it to firestore at messages/${write.id}`
})

export { registerSupporter } from './endpoint/registerSupporter'
export { registerCreator } from './endpoint/registerCreator'
export { getOrCreateInvitation } from './endpoint/getOrCreateInvitation'
export { validateInvitation } from './endpoint/validateInvitation'
export { stripeAccountOnboard } from './endpoint/stripeAccountOnboard'
export { stripeCompleteOnboard } from './endpoint/stripeCompleteOnboard'
export { createService } from './endpoint/createService'
export { writeNewReview } from './endpoint/writeNewReview';
export { getRecentReviews } from './endpoint/getRecentReviews';
export { getReviewScore } from './endpoint/getReviewScore';