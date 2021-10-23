import { db } from '../config'
import AuthUserService from '../services/auth/AuthUserService'

export default class UserFinder {
  uid: string

  constructor(uid: string) {
    this.uid = uid
  }

  public async fetch(): Promise<FirebaseFirestore.DocumentData> {
    if (!this.uid) throw new Error('UID required to fetch user')
    const authUser = await new AuthUserService().getUser(this.uid)
    let dbUser = await db
      .collection(authUser.customClaims!.type)
      .doc(this.uid)
      .get()
    return dbUser.data()!
  }
}
