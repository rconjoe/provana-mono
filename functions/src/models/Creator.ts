
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
   * Creates an instance of Creator.
   * @date 9/14/2021 - 10:31:40 AM
   *
   * @constructor
   * @param {?string} [uid]
   * @param {?string} [customer]
   * @param {?string} [account]
   * @param {?boolean} [onboarded]
   * @param {?boolean} [partner]
   * @param {?string} [email]
   * @param {?string} [temp]
   * @param {?string} [code]
   * @param {?string} [username]
   * @param {?string} [timezone]
   * @param {?string} [avatar]
   * @param {?string} [banner]
   * @param {?string} [twitter]
   * @param {?string} [twitch]
   * @param {?string} [youtube]
   * @param {?string} [facebook]
   * @param {?boolean} [online]
   * 
   * @mermaid
   *   graph TD;
   *     A-->B;
   *     A-->C;
   *     B-->D;
   *     C-->D;
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

  public setRegisterData(email: string, password: string, code: string, username: string): Creator {
    this.email = email,
    this.temp = password,
    this.code = code
    this.username = username
    return this
  }

}
