/**
 * @fileoverview class that contains a uid and a idToken for use when authenticating a user
 */
export class UserAuth {
    
    
    /**
     * A user's firebase Uid needed to compair to the uid decrypted from the idToken
     * @date 8/13/2021 - 4:04:49 PM
     *
     * @type {String}
     */
    uid: string;

    
    /**
     * firebase idToken, to be decrypted by firebase Auth to gain access to the firebase Auth User object
     * @date 8/13/2021 - 4:05:23 PM
     *
     * @type {String}
     */
    idToken: string;

    
    /**
     * Cross Sight Request Forgery token used to prevent someone stealing a cookie and sending it from a malicious domain 
     * @date 8/13/2021 - 4:13:09 PM
     *
     * @type {string}
     */
    csrfToken?: string;

    public constructor(uid: string, idToken: string){
        this.uid = uid;
        this.idToken = idToken;
    }

    
    /**
     * getter for the objects firebase uid
     * @date 8/13/2021 - 4:15:19 PM
     *
     * @public
     * @returns {string}
     */
    public getUid() {
        return this.uid;
    }

    public setUid(uid: string) {
        this.uid = uid
    }

    
    /**
     * getter for the objects firebase Id Token
     * @date 8/13/2021 - 4:15:40 PM
     *
     * @public
     * @returns {string}
     */
    public getIdToken() {
        return this.idToken;
    }

    
    /**
     * Setter for the csrfToken property that is not set by the constructor
     * @date 8/13/2021 - 4:15:59 PM
     *
     * @public
     * @param {string} csrfToken
     */
    public setCsrfToken(csrfToken: string):void {
        this.csrfToken = csrfToken;
    }


    
    /**
     * Getter for either getting the csrf token or returns a string that says its not set
     * @date 8/16/2021 - 3:09:08 PM
     *
     * @public
     * @async
     * @returns {string}
     */
    public getCsrfToken():string {
        if(this.csrfToken != null) {
            return this.csrfToken;
        }
        else {
            return "the csrf token was not set"
        }
    }

}