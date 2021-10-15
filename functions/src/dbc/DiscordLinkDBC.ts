import DiscordLink from '../models/DiscordLink'
// import { db } from '../config'

export default class DiscordLinkDBC extends DiscordLink {
  code: string | undefined
  uid: string | undefined
  type: string | undefined
  ref: FirebaseFirestore.DocumentReference | undefined

  constructor(
    code?: string, 
    uid?: string, 
    type?: string,
    ref?: FirebaseFirestore.DocumentReference
  ) {
    super(code, uid, type)
    this.ref = ref
  }

  public toModel(): DiscordLink {
    return new DiscordLink(
      this.code,
      this.uid,
      this.type
    )
  }

}
