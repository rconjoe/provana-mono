import { db } from '../config'
import Invitation from '../models/Invitation'
import Creator from '../models/Creator'
import TimeService from '../services/TimeService'

const converter = {
  toFirestore(invitation: InvitationDBC): FirebaseFirestore.DocumentData {
    return {
      id: invitation.id ? invitation.id : "",
      code: invitation.code ? invitation.code : "",
      generated: invitation.generated ? invitation.generated : 0,
      valid: invitation.valid ? invitation.valid : true,
      uid: invitation.uid ? invitation.uid : ""
    }
  },
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): InvitationDBC {
    const data = snapshot.data()
    return new InvitationDBC(
      data.id,
      data.code,
      data.generated,
      data.valid,
      data.uid,
      snapshot.ref
    )
  }
}

export default class InvitationDBC extends Invitation {

  id: string | undefined
  code: string | undefined
  generated: number | undefined
  valid: boolean | undefined
  uid: string | undefined
  ref: FirebaseFirestore.DocumentReference | undefined

  constructor(
    id?: string,
    code?: string,
    generated?: number,
    valid?: boolean,
    uid?: string,
    ref?: FirebaseFirestore.DocumentReference,
  ) {
    super(id, code, generated, valid, uid)
    this.ref = ref
  }

  public toModel(): Invitation {
    return new Invitation(
      this.id,
      this.code,
      this.generated,
      this.valid,
      this.uid,
    )
  }

  public setUser(discordUserID: string): InvitationDBC {
    this.id = discordUserID
    return this
  }

  public async getOrCreate(): Promise<string> {
    if (this.id === null || this.id === undefined) throw new Error('Discord ID is required to get or create')
    return (await this.exists()) ? await this.getFromId() : await this.create()
  }

  public async exists(): Promise<boolean> {
    const snap = await db.collection('invitations').doc(this.id!).get()
    return snap.exists
  }

  public async getFromId(): Promise<string> {
    if (this.id === null || this.id === undefined) throw new Error('Discord ID is required to fetch invitation.')
    const snap = await db.collection('invitations').doc(this.id).withConverter(converter).get()
    return snap.data()!.code!
  }

  public async create(): Promise<string> {
    this.ref = db.collection('invitations').doc(this.id!)
    this.code = this.generateCode()
    this.generated = new TimeService().generate()
    this.valid = true,
    await this.ref.withConverter(converter).set(this)
    return this.code
  }

  private generateCode(): string {
    const code = []
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const len = characters.length
    for (let i=0; i<10; i++) {
      code.push(characters.charAt(Math.floor(Math.random() * len)))
    }
    return code.join('')
  }

  public setCode(code: string): InvitationDBC {
    this.code = code
    return this
  }

  public async validate(): Promise<boolean> {
    const doc = await this.getFromCode()
    return doc.valid!
  }

  public async associate(creator: Creator): Promise<FirebaseFirestore.WriteResult> {
    if (!creator.uid || !creator.code) throw new Error('Code and UID needed to associate Invitation with user.')
    const q = await db.collection('invitations').where('code', '==', creator.code).get()
    if (q.empty) throw new Error('Invitation not found in Firestore.')
    return await q.docs[0].ref.update({
      uid: creator.uid,
      valid: false
    })
  }

  private async getFromCode(): Promise<InvitationDBC> {
    if (this.code === "" || this.code === undefined) throw new Error('Invitation code is required.')
    const invitation =  await db.collection('invitations').where('code', '==', this.code).withConverter(converter).get()
    if (invitation.empty === true) throw new Error('Invitation not found')
    return invitation.docs[0].data()!
  }
}
