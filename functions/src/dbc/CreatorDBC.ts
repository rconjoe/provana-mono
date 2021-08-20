import { db } from '../config'
import { Creator } from '../models/Creator'
import { InvitationDBC } from '../dbc/InvitationDBC'

const converter = {
  toFirestore(creator: CreatorDBC): FirebaseFirestore.DocumentData {
    return {
      uid: creator.uid ? creator.uid : "",
      customer: creator.customer ? creator.customer : "",
      account: creator.account ? creator.account : "",
      onboarded: creator.onboarded ? creator.onboarded : false,
      email: creator.email ? creator.email : "",
      temp: creator.temp ? creator.temp : "",
      code: creator.code ? creator.code : "",
      username: creator.username ? creator.username : "",
      timezone: creator.timezone ? creator.timezone : "",
      avatar: creator.avatar ? creator.avatar : "",
      banner: creator.banner ? creator.banner : "",
      twitter: creator.twitter ? creator.twitter : "",
      twitch: creator.twitch ? creator.twitch : "",
      youtube: creator.youtube ? creator.youtube : "",
      facebook: creator.facebook ? creator.facebook : ""

    }
  },
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): CreatorDBC {
    const data = snapshot.data()
    return new CreatorDBC(
      data.uid,
      data.customer,
      data.account,
      data.onboarded,
      data.email,
      data.temp,
      data.code,
      data.username,
      data.timezone,
      data.avatar,
      data.banner,
      data.twitter,
      data.twitch,
      data.youtube,
      data.facebook,
      snapshot.ref
    )
  }
}

export class CreatorDBC extends Creator {

  ref: FirebaseFirestore.DocumentReference | undefined

  constructor(
    uid?: string | undefined,
    customer?: string | undefined,
    account?: string | undefined,
    onboarded?: boolean | undefined,
    email?: string | undefined,
    temp?: string | undefined,
    code?: string | undefined,
    username?: string | undefined,
    timezone?: string | undefined,
    avatar?: string | undefined,
    banner?: string | undefined,
    twitter?: string | undefined,
    twitch?: string | undefined,
    youtube?: string | undefined,
    facebook?: string | undefined,
    ref?: FirebaseFirestore.DocumentReference | undefined,
  ) {
    super(uid, customer, account, onboarded, email, temp, code, username, timezone, avatar, banner, twitter, twitch, youtube, facebook)
    this.ref = ref
  }

  toModel(): Creator {
    return new Creator(
      this.uid,
      this.customer,
      this.account,
      this.onboarded,
      this.email,
      this.temp,
      this.code,
      this.username,
      this.timezone,
      this.avatar,
      this.banner,
      this.twitter,
      this.twitch,
      this.youtube,
      this.facebook
    )
  }

  public async writeNew(creator: Creator): Promise<FirebaseFirestore.WriteResult> {
    if (creator.uid === null || creator.uid === undefined) throw new Error('Missing UID')
      this.uid = creator.uid
      this.customer = creator.customer
      this.account = creator.account
      this.onboarded = false
      this.email = creator.email
      this.code = creator.code
      this.username = creator.username
      const docRef = db.collection('creators').doc(this.uid!)
      this.ref = docRef

      await new InvitationDBC().associate(this.toModel())

      return await this.ref.withConverter(converter).set(this)
      .catch((err) => {
        throw new Error(err)
      })
  }

  public async fetchByUid(uid?: string | undefined): Promise<Creator> {
    if (!uid && !this.uid) throw new Error('UID required')
    const creator = await db.collection('creators').doc(uid ? uid : this.uid!).withConverter(converter).get()
    if (!creator.exists) throw new Error('Creator not found in firestore.')
    return creator.data()!
  }

  public async fetchAccountId(uid?: string | undefined): Promise<string> {
    if (!uid && !this.uid) throw new Error('UID required')
    const creator = await this.fetchByUid(uid)
    if(creator.account === "") throw new Error('Missing account ID in firestore!')
    return creator.account!
  }

  private async update(data: object): Promise<FirebaseFirestore.WriteResult> {
    if (this.uid === "" || this.uid === undefined) throw new Error('UID required to update document.')
    return await db.collection('creators').doc(this.uid).update({...data})
    .catch((err) => {
      throw new Error(err)
    })
  }

  public async completeOnboard(onboarded: boolean): Promise<FirebaseFirestore.WriteResult> {
    return await this.update({onboarded: onboarded})
      .catch((err) => {
        throw new Error(err)
      })
  }
}