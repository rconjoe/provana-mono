
/**
 * Export of the Supporter Class
 *
 * @class Supporter
 * @typedef {Supporter}
 * @module Supporter
 * @category src
 * @subcategory models
 */
export default class Supporter {

  uid: string | undefined
  customer: string | undefined
  email: string | undefined
  temp: string | undefined
  discord: string | undefined
  username: string | undefined
  timezone: string | undefined
  avatar: string | undefined
  banner: string | undefined
  online: boolean | undefined
  
  
  /**
   * Creates an instance of Supporter.
   *
   * @constructor
   * @param {?string} [uid] Firebase uid of the Supporter
   * @param {?string} [customer] Stripe Customer id property from the Stripe Accounts api
   * @param {?string} [email] Email of the Supporter
   * @param {?string} [temp] Where we store the Supporter's password for a short time during the sign up process
   * @param {?string} [username] Username chosen by the Supporter
   * @param {?string} [timezone] The supporter's time zone, its picked for them upon first login, and can be changed later
   * @param {?string} [avatar] The Supporter's profile avitar picture url
   * @param {?string} [banner] The Supporter's banner picture url
   * @param {?boolean} [online] Boolean that flips if a user is currently on the website
   */
  constructor(
    uid?: string,
    customer?: string,
    email?: string,
    temp?: string,
    discord?: string,
    username?: string,
    timezone?: string,
    avatar?: string,
    banner?: string,
    online?: boolean
    ) {
      this.uid = uid,
      this.customer = customer
      this.email = email,
      this.temp = temp,
      this.discord = discord,
      this.username = username,
      this.timezone = timezone,
      this.avatar = avatar,
      this.banner = banner,
      this.online = online
    }

    
  /**
   * Setter for email, password and username, of the Supporter, needed for the sign up process
   *
   * @public
   * @param {string} email
   * @param {string} password
   * @param {string} username
   * @returns {Supporter}
   */
  public setRegisterData(email: string, password: string, username: string, discord: string): Supporter {
    this.uid = "",
    this.customer = "",
    this.email = email,
    this.temp = password,
    this.discord = discord,
    this.username = username,
    this.timezone = "",
    this.avatar = "",
    this.banner = ""
    return this
  }
}
