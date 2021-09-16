import { db } from "../config";
import Review from "../models/Review";

/**
 * Converter for either mapping data to a Firestore document snapshot or from Firestore to ReviewDBC object
 * 
 * @returns {{ toFirestore(invitation: InvitationDBC): any; fromFirestore(snapshot: any): InvitationDBC; }}
 */
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



/**
 * Export for the ReviewDBC class
 *
 *
 * @class ReviewDBC
 * @typedef {ReviewDBC}
 * @extends {Review}
 * @module ReviewDBC
 * @category src
 * @subcategory dbc
 */
export default class ReviewDBC extends Review {

    private ref: FirebaseFirestore.DocumentReference | undefined;

    
    /**
     * Creates an instance of ReviewDBC.
     *
     * @constructor
     * @param {?(string | undefined)} [sellerUid] Creator's Firebase uid
     * @param {?(string | undefined)} [buyerUid] Supporter's Firebase uid
     * @param {?(string | undefined)} [message] Message left by the Supporter about the session
     * @param {?(Date | undefined)} [date] Date that the review was left
     * @param {?(number | undefined)} [rating] Rating 1-5 that the Supporter left for the session
     * @param {?(string | undefined)} [serviceName] Name of the service that the supporter is reviewing
     * @param {?(FirebaseFirestore.DocumentReference | undefined)} [ref] Firestore document reference that points to the document we want to access
     */
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

    
    /**
     * Method that creates a new Review object from the ReviewDBC object
     *
     * @returns {Review}
     */
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

    
    /**
     * Method that takes a Review object and writes a new Firestore document in the collection 'reviews' that contains the data from the Review object
     *
     * @public
     * @async
     * @param {Review} review
     * @returns {Promise<FirebaseFirestore.WriteResult>}
     */
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

    
    /**
     * Setter that sets the Creator's uid
     *
     * @public
     * @param {string} sellerUid
     * @returns {ReviewDBC}
     */
    public setSellerUid(sellerUid: string): ReviewDBC {
        this.sellerUid = sellerUid
        return this
    }

    
    /**
     * Method that gest the 20 most recent reviews left for that Creator
     *
     * @public
     * @async
     * @returns {Promise<Array<Review>>}
     */
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

    
    /**
     * Method that gets the reviews for a Creator and averages out all of their review ratings to give a final rating between 1-5
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
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
