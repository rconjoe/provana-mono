import { db } from '../config'
import { Supporter } from '../models/Supporter'

const converter = {
  toFirestore(supporter: SupporterDBC): FirebaseFirestore.DocumentData {
    return {
      uid: supporter.uid,
      customer: supporter.customer,
      email: supporter.email,
      username: supporter.username,
      timezone: supporter.timezone,
      avatar: supporter.avatar,
      banner: supporter.banner
    }
  },
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): SupporterDBC {
    const data = snapshot.data()
    return new SupporterDBC(
      data.uid,
      data.customer,
      data.email,
      data.temp,
      data.username,
      data.timezone,
      data.avatar,
      data.banner,
      snapshot.ref
    )
  }
}

export class SupporterDBC extends Supporter {

  static readonly UID_FIELD = 'uid'
  static readonly CUSTOMER_FIELD = 'customer'
  static readonly EMAIL_FIELD = 'email'
  static readonly USERNAME_FIELD = 'username'
  static readonly TIMEZONE_FIELD = 'timezone'
  static readonly AVATAR_FIELD = 'avatar'
  static readonly BANNER_FIELD = 'banner'

  ref: FirebaseFirestore.DocumentReference | undefined

  constructor(
    uid?: string | undefined,
    customer?: string | undefined,
    email?: string | undefined,
    temp?: string | undefined,
    username?: string | undefined,
    timezone?: string | undefined,
    avatar?: string | undefined,
    banner?: string | undefined,
    ref?: FirebaseFirestore.DocumentReference | undefined,
  ) {
    super(uid, customer, email, temp, username, timezone, avatar, banner)
    this.ref = ref
  }

  toModel(): Supporter {
    return new Supporter(
      this.uid,
      this.customer,
      this.email,
      this.temp,
      this.username,
      this.timezone,
      this.avatar,
      this.banner,
    )
  }

  public async writeNew(supporter: Supporter): Promise<FirebaseFirestore.WriteResult> {
    if (supporter.uid === null || supporter.uid === undefined) throw new Error('Missing UID')
      this.uid = supporter.uid
      this.customer = supporter.customer
      this.email = supporter.email
      this.temp = ""
      this.username = supporter.username
      this.timezone = ""
      this.avatar = ""
      this.banner = ""
      this.banner = ""
      const docRef = db.collection('supporters').doc(this.uid!)
      this.ref = docRef

      return await this.ref.withConverter(converter).set(this)
      .catch((err) => {
        throw new Error(err)
      })
  }
}