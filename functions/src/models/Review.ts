
/**
 * Class that contains all the informatino about a rating
 * @date 8/17/2021 - 3:00:26 PM
 *
 * @export
 * @class Review
 * @typedef {Review}
 */
export default class Review {


    /**
     * Seller UID needed to either GET the reviews from database or PUT a new one in the collection
     * @date 8/17/2021 - 3:00:48 PM
     *
     * @public
     * @type {string}
     */
    public sellerUid?: string;


    /**
     * Optional Buyer UID used to GET the information about them to save on the review
     * @date 8/17/2021 - 3:01:25 PM
     *
     * @public
     * @type {?string}
     */
    public buyerUid?: string;


    /**
     * Optional message from a supporter to be saved on the review
     * @date 8/17/2021 - 3:01:54 PM
     *
     * @public
     * @type {?string}
     */
    public message?: string;


    /**
     * Optional the date that a review was written
     * @date 8/17/2021 - 3:02:28 PM
     *
     * @public
     * @type {?Date}
     */
    public date?: Date;


    /**
     * Optional the rating a supporter gave the service
     * @date 8/17/2021 - 3:02:46 PM
     *
     * @public
     * @type {?number}
     */
    public rating?: number;


    /**
     * Optional the name of the service that the review was written for
     * @date 8/17/2021 - 3:03:04 PM
     *
     * @public
     * @type {?string}
     */
    public serviceName?: string;


    /**
     * Creates an instance of Review.
     * @date 8/17/2021 - 3:03:23 PM
     *
     * @constructor
     * @public
     * @param {string} sellerUid
     * @param {?string} [buyerUid]
     * @param {?string} [message]
     * @param {?Date} [date]
     * @param {?number} [rating]
     * @param {?string} [serviceName]
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
     * @date 8/17/2021 - 3:03:34 PM
     *
     * @public
     * @param {string} buyerUid
     */
    public setBuyerUid(buyerUid:string):void {
        this.buyerUid = buyerUid;
    }


    /**
     * Setter for the message atrabute
     * @date 8/17/2021 - 3:03:45 PM
     *
     * @public
     * @param {string} message
     */
    public setMessage(message: string):void {
        this.message = message;
    }


    /**
     * Setter for the date atribute
     * @date 8/17/2021 - 3:04:19 PM
     *
     * @public
     * @param {Date} date
     */
    public setDate(date: Date):void {
        this.date = date;
    }


    /**
     * Setter for the rating atribute
     * @date 8/17/2021 - 3:04:30 PM
     *
     * @public
     * @param {number} rating
     */
    public setRating(rating:number):void {
        this.rating = rating;
    }


    /**
     * Setter for the serviceName atribute
     * @date 8/17/2021 - 3:04:46 PM
     *
     * @public
     * @param {string} serviceName
     */
    public setServiceName(serviceName: string):void {
        this.serviceName = serviceName;
    }

}
