export class Creator {

  static readonly UID_FIELD = 'uid'
  static readonly ACCOUNT_FIELD = 'account'
  static readonly CUSTOMER_FIELD = 'customer'
  static readonly EMAIL_FIELD = 'email'
  static readonly USERNAME_FIELD = 'username'
  static readonly TIMEZONE_FIELD = 'timezone'
  static readonly AVATAR_FIELD = 'avatar'
  static readonly BANNER_FIELD = 'banner'

  uid: string | undefined
  account: string | undefined
  customer: string | undefined
  email: string | undefined
  temp: string | undefined
  username: string | undefined
  timezone: string | undefined
  avatar: string | undefined
  banner: string | undefined

  constructor(
    uid?: string,
    account?: string,
    customer?: string,
    email?: string,
    temp?: string,
    username?: string,
    timezone?: string,
    avatar?: string,
    banner?: string
    ) {
      this.uid = uid,
      this.account = account,
      this.customer = customer
      this.email = email,
      this.temp = temp,
      this.username = username,
      this.timezone = timezone,
      this.avatar = avatar,
      this.banner = banner
    }

  public setRegisterData(email: string, password: string, username: string): Creator {
    this.email = email,
    this.temp = password,
    this.username = username
    return this
  }

}