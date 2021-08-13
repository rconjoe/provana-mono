export class Supporter {

  uid: string | undefined
  customer: string | undefined
  email: string | undefined
  temp: string | undefined
  username: string | undefined
  timezone: string | undefined
  avatar: string | undefined
  banner: string | undefined

  constructor(
    uid?: string,
    customer?: string,
    email?: string,
    temp?: string,
    username?: string,
    timezone?: string,
    avatar?: string,
    banner?: string
    ) {
      this.uid = uid,
      this.customer = customer
      this.email = email,
      this.temp = temp,
      this.username = username,
      this.timezone = timezone,
      this.avatar = avatar,
      this.banner = banner
    }

  public setRegisterData(email: string, password: string, username: string): Supporter {
    this.uid = "",
    this.customer = "",
    this.email = email,
    this.temp = password,
    this.username = username,
    this.timezone = "",
    this.avatar = "",
    this.banner = ""
    return this
  }
}