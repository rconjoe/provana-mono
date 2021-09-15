import { db } from "../config";
import Review from "../models/Review";

const converter = {
    toFirestore(review: ReviewDBC): FirebaseFirestore.DocumentData {
        return {
            sellerUid: review.sellerUid ? review.sellerUid: "",
            buyerUid: review.buyerUid ? review.buyerUid: "",
            message: review.message ? review.message: "",
            date: review.date ? review.date : new Date,
            rating: review.rating ? review.rating : 1,
            serviceName: review.serviceName ? review.serviceName : "",
        }
    },

    fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): ReviewDBC {
        const data = snapshot.data();
        return new ReviewDBC(
            data.sellerUid,
            data.buyerUid,
            data.message,
            data.date,
            data.rating,
            data.serviceName,
            snapshot.ref,
        )
    }
}



export default class ReviewDBC extends Review {

    private ref: FirebaseFirestore.DocumentReference | undefined;

    constructor(
        sellerUid?: string | undefined,
        buyerUid?: string | undefined,
        message?: string | undefined,
        date?: Date | undefined,
        rating?: number | undefined,
        serviceName?: string | undefined,
        ref?: FirebaseFirestore.DocumentReference | undefined
    ) {
        super(sellerUid, buyerUid, message, date, rating, serviceName)
        this.ref = ref;
    }

    toModel():Review {
        return new Review(
            this.sellerUid,
            this.buyerUid,
            this.message,
            this.date,
            this.rating,
            this.serviceName
        )
    }

    public async writeNew(review: Review): Promise<FirebaseFirestore.WriteResult> {
        if(review.sellerUid === null || review.sellerUid === undefined) throw new Error('Missing SellerUid')

        this.buyerUid = review.buyerUid;
        this.sellerUid = review.sellerUid;
        this.message = review.message;
        this.date = review.date;
        this.rating = review.rating;
        this.serviceName = review.serviceName;

        const docRef = db.collection('reviews').doc();
        this.ref = docRef;

        return await this.ref.withConverter(converter).set(this)
            .catch((err) => {
                throw new Error(err);
            })
    }

    public setSellerUid(sellerUid: string): ReviewDBC {
        this.sellerUid = sellerUid
        return this
    }

    public async getRecentReviews(): Promise<Array<Review>> {
        if(this === null || this.sellerUid === undefined) throw new Error('Missing Seller Uid');
        let reviewArr: Array<Review> = []
        const query = await db.collection('reviews')
            .where('sellerUid', '==', this.sellerUid)
            .withConverter(converter)
            .orderBy('date', 'desc')
            .limit(20)
            .get()
        query.forEach((review) => {
            reviewArr.push(review.data()!.toModel())
        })
        return reviewArr
    }

    public async getReviewScore(): Promise<number> {

        if(this === null || this.sellerUid === undefined) throw new Error('Missing Seller Uid');

        const reviewArray: FirebaseFirestore.DocumentData[] = [];
        const collectionRef = db.collection('reviews').where('sellerUid','==',this.sellerUid).orderBy("date","desc");

        const returnedFirebaseData = await collectionRef.get();
        let summedRating = 0;
        let averageRating = 0;

        returnedFirebaseData.forEach((doc) => {
            reviewArray.push(doc.data());
        })

        reviewArray.forEach((doc) => {
            summedRating += doc.rating;
        })

        averageRating = summedRating / reviewArray.length;

        return averageRating;
    }

}
