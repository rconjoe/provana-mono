import * as functions from 'firebase-functions';
import { ReviewDBC } from '../dbc/ReviewDBC';

export const writeNewReview = functions.https.onCall(async (data,context) => {
    const reviewDBC = new ReviewDBC(
        data.sellerUid,
        data.buyerUid,
        data.message,
        data.date,
        data.rating,
        data.serviceName
    )

    const review = reviewDBC.toModel();

    return reviewDBC.writeNew(review);
})