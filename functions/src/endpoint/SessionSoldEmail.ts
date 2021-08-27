import * as functions from "firebase-functions";
import { sendSessionSoldEmail } from "../services/mailer/SessionSold";

export const onSessionSold = functions.firestore.document('sessions/{sessionId}/slots/{slotId}').onUpdate(async(change, context) => {
    const afterChange = change.after.data();
    const beforeChange = change.before.data();

    if(beforeChange.status === 'potential' && afterChange.status === 'purchased') {
        const today = new Date;
        await sendSessionSoldEmail(afterChange.sellerUsername, afterChange.buyerUsername,today,afterChange.serviceDocId,afterChange.sellerUid);
        return "Email Sent";
    }
    else {
        return "Slot doc not updated this function should not have triggered";
    }

})