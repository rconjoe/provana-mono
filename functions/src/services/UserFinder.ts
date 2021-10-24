import { db } from '../config'
import AuthUserService from '../services/auth/AuthUserService'

export default class UserFinder {
  uid: string | undefined

  constructor(uid?: string) {
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

  public async fetchByUsername(username: string): Promise<FirebaseFirestore.DocumentData> {
    let user: FirebaseFirestore.DocumentData = {}
    const qcreator = await db
      .collection('creators')
      .where('username', '==', username)
      .get()
    if (!qcreator.empty) {
      user = qcreator.docs[0].data()
    } 
    else {
      let qsupporter = await db
        .collection('supporters')
        .where('username', '==', username)
        .get()
      if (!qsupporter.empty) {
        user = qsupporter.docs[0].data()
      } 
    }
    return user
  }
}
