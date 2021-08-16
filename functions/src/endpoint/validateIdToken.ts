import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { UserAuth } from '../models/UserAuth';

export const userAuthValidation = functions.https.onCall(async (data) => {
    if(data === null || data === undefined) throw new Error('Null Payload');
    
    const userAuth = new UserAuth(data.uid,data.idToken);

    const customToken = await admin.auth().verifyIdToken(userAuth.getIdToken()).then((token) => {
        const uid = userAuth.getUid();
        if(token.uid === uid) {
            return admin.auth().createCustomToken(uid);
        }
        else {
            return "the id token and uid of the user did not match"
        }
    })
    return customToken;
})