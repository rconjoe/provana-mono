import DiscordLink from '../models/DiscordLink'
import { db } from '../config'

// const converter = {
//   toFirestore(link: DiscordLinkDBC): FirebaseFirestore.DocumentData {
//     return {
//       uid: link.uid ? link.uid : "",
//       type: link.type ? link.type : "",
//     }
//   },
//   fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): DiscordLinkDBC {
//     const data = snapshot.data()
//     return new DiscordLinkDBC(
//       data.uid,
//       data.type,
//       snapshot.ref
//     )
//   }
// }
export default class DiscordLinkDBC extends DiscordLink {
  uid: string | undefined
  type: string | undefined
  ref: FirebaseFirestore.DocumentReference | undefined

  constructor(
    uid?: string, 
    type?: string,
    ref?: FirebaseFirestore.DocumentReference
  ) {
    super(uid, type)
    this.ref = ref
  }

  public toModel(): DiscordLink {
    return new DiscordLink(
      this.uid,
      this.type
    )
  }

  public async write(discordId: string): Promise<void> {
    if (this.uid === '' || this.uid === undefined) throw new Error('UID required to write DiscordLink')
    if (this.type === '' || this.type === undefined) throw new Error('Account type required to write DiscordLink')
    await db.collection('discord')
      .doc(discordId)
      .set({ uid: this.uid, type: this.type })
    .catch(err => console.error(err))
  }

  public async getUid(discordId: string): Promise<string> {
    let uid = await db.collection('discord')
      .doc(discordId)
      .get()
    if (!uid.exists) return 'NOTFOUND'
    else return uid.data()!.uid
  }

}
