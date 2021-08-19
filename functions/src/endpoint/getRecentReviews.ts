import * as functions from 'firebase-functions';
import { ReviewDBC } from '../dbc/ReviewDBC';

export const getRecentReviews = functions.https.onCall(async (data, context) => {
    const reviewDBC = new ReviewDBC(data.sellerUid);

    const review = reviewDBC.toModel();

     const reviewArray = await reviewDBC.getRecentReviews(review);

    return reviewArray;
})