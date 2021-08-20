import * as functions from 'firebase-functions';
import { ReviewDBC } from '../dbc/ReviewDBC';

export const getRecentReviews = functions.https.onCall(async (data, context) => {
    const dbc = new ReviewDBC().setSellerUid(data.sellerUid)

    return await dbc.getRecentReviews()
})