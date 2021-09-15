
/**
 * Class that contains all the informatino about a rating
 * @class Review
 * @typedef {Review}
 * @module Review
 */
export default class Review {

    public sellerUid?: string;
    public buyerUid?: string;
    public message?: string;
    public date?: Date;
    public rating?: number;
    public serviceName?: string;


    /**
     * Creates an instance of Review.
     * @constructor
     * @public
     * @param {string} sellerUid Firebase UID of the Creator who rendered the service
     * @param {?string} [buyerUid] Firebase UID of the Supporter who purchased the service
     * @param {?string} [message] Message the Supporter left about the service 
     * @param {?Date} [date] Date that the review was written
     * @param {?number} [rating] Raiting 1-5 of the service, left by the Supporter
     * @param {?string} [serviceName] Name of the service that the Supporter was reviewing
     */
    public constructor(sellerUid?: string, buyerUid?: string, message?: string, date?: Date, rating?: number, serviceName?: string) {
        this.sellerUid = sellerUid;
        this.buyerUid = buyerUid;
        this.message = message;
        this.date = date;
        this.rating = rating;
        this.serviceName = serviceName;
    }


    /**
     * Setter for the BuyerUid atribute
     *
     * @public
     * @param {string} buyerUid
     */
    public setBuyerUid(buyerUid:string):void {
        this.buyerUid = buyerUid;
    }


    /**
     * Setter for the message atrabute
     *
     * @public
     * @param {string} message
     */
    public setMessage(message: string):void {
        this.message = message;
    }


    /**
     * Setter for the date atribute
     *
     * @public
     * @param {Date} date
     */
    public setDate(date: Date):void {
        this.date = date;
    }


    /**
     * Setter for the rating atribute
     *
     * @public
     * @param {number} rating
     */
    public setRating(rating:number):void {
        this.rating = rating;
    }


    /**
     * Setter for the serviceName atribute
     *
     * @public
     * @param {string} serviceName
     */
    public setServiceName(serviceName: string):void {
        this.serviceName = serviceName;
    }

}
