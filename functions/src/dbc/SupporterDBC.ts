import { db } from '../config'
import { Supporter } from '../models/Supporter'

const converter = {
  toFirestore(supporter: SupporterDBC): FirebaseFirestore.DocumentData {
    return {
      uid: supporter.uid ? supporter.uid : "",
      customer: supporter.customer ? supporter.customer : "",
      email: supporter.email ? supporter.email : "",
      username: supporter.username ? supporter.username : "",
      timezone: supporter.timezone ? supporter.timezone : "",
      avatar: supporter.avatar ? supporter.avatar : "",
      banner: supporter.banner ? supporter.banner : "",
      online: supporter.online ? supporter.online : false
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
      data.online,
      snapshot.ref
    )
  }
}

export class SupporterDBC extends Supporter {

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
    online?: boolean | undefined,
    ref?: FirebaseFirestore.DocumentReference | undefined,
  ) {
    super(uid, customer, email, temp, username, timezone, avatar, banner, online)
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
      this.online
    )
  }

  public async writeNew(supporter: Supporter): Promise<FirebaseFirestore.WriteResult> {
    if (supporter.uid === null || supporter.uid === undefined) throw new Error('Missing UID')
      this.uid = supporter.uid
      this.customer = supporter.customer
      this.email = supporter.email
      this.username = supporter.username
      const docRef = db.collection('supporters').doc(this.uid!)
      this.ref = docRef

      return await this.ref.withConverter(converter).set(this)
      .catch((err) => {
        throw new Error(err)
      })
  }
}