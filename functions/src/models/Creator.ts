
/**
 * Exports the class Creator
 * @class Creator
 * @typedef {Creator}
 * @module Creator
 */
export default class Creator {

  uid: string | undefined
  customer: string | undefined
  account: string | undefined
  onboarded: boolean | undefined
  partner: boolean | undefined
  email: string | undefined
  temp: string | undefined
  code: string | undefined
  username: string | undefined
  timezone: string | undefined
  avatar: string | undefined
  banner: string | undefined
  twitter: string | undefined
  twitch: string | undefined
  youtube: string | undefined
  facebook: string | undefined
  online: boolean | undefined

  
  /**
   *
   * @constructor
   * @param {?string} [uid] Firebase UID property
   * @param {?string} [customer] Stripe Customer id property from the Stripe Accounts api
   * @param {?string} [account] Stripe account id property from the Stripe Accounts api
   * @param {?boolean} [onboarded] Boolean if the user is onboarded with stripe
   * @param {?boolean} [partner] Boolean if the user is a alpha partner or not
   * @param {?string} [email] The user's email address
   * @param {?string} [temp] Where we store the user's password for a short time during the sign up process
   * @param {?string} [code] The partner code given by the discord bot used to sign up as an alpha partner
   * @param {?string} [username] The username chosen by the user
   * @param {?string} [timezone] The user's time zone, its picked for them upon first login, and can be changed later
   * @param {?string} [avatar] The user's profile avitar picture url
   * @param {?string} [banner] The user's storefront banner picture
   * @param {?string} [twitter] The user's twitter handle
   * @param {?string} [twitch] User's twitch channel name
   * @param {?string} [youtube] User's youtube channel name
   * @param {?string} [facebook] User's Facebook profile 
   * @param {?boolean} [online] Boolean that flips if a user is currently on the website
   * 
   * @mermaid
   *   graph TD;
   *     A-->B;
   *     A-->C;
   *     B-->D;
   *     C-->D;
   *     D-->test;
   */
  constructor(
    uid?: string,
    customer?: string,
    account?: string,
    onboarded?: boolean,
    partner?: boolean,
    email?: string,
    temp?: string,
    code?: string,
    username?: string,
    timezone?: string,
    avatar?: string,
    banner?: string,
    twitter?: string,
    twitch?: string,
    youtube?: string,
    facebook?: string,
    online?: boolean
    ) {
      this.uid = uid,
      this.customer = customer
      this.account = account,
      this.onboarded = onboarded,
      this.partner = partner,
      this.email = email,
      this.temp = temp,
      this.code = code,
      this.username = username,
      this.timezone = timezone,
      this.avatar = avatar,
      this.banner = banner
      this.twitter = twitter,
      this.twitch = twitch,
      this.youtube = youtube,
      this.facebook = facebook,
      this.online = online
    }

    
  /**
   * Setter method that sets email, password, partner code, and username on the object
   *
   * @public
   * @param {string} email
   * @param {string} password
   * @param {string} code
   * @param {string} username
   * @returns an updated instance of the Creator object that was created
   */
  public setRegisterData(email: string, password: string, code: string, username: string): Creator {
    this.email = email,
    this.temp = password,
    this.code = code
    this.username = username
    return this
  }
}
