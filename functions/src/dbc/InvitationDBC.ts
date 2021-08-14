import { db } from '../config'
import { Invitation } from '../models/Invitation'
import { UnixTimestampService } from '../services/UnixTimestampService'

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

export class InvitationDBC {

  id: string | undefined
  code: string | undefined
  generated: number | undefined
  valid: boolean | undefined
  uid: string | undefined
  ref: FirebaseFirestore.DocumentReference | undefined

  constructor(
  id?: string | undefined,
  code?: string | undefined,
  generated?: number | undefined,
  valid?: boolean | undefined,
  uid?: string | undefined,
  ref?: FirebaseFirestore.DocumentReference | undefined
  ) {
    this.id = id,
    this.code = code,
    this.generated = generated,
    this.valid = valid,
    this.uid = uid
    this.ref = ref
  }

  public async isValid(code?: string | undefined): Promise<boolean> {
    code ? code : this.code
    return this.valid ? this.valid : (await this.getFromCode(code)).valid!
  }

  public async createNew(dUser: string): Promise<InvitationDBC> {
    this.ref = db.collection('invitations').doc(dUser)
    this.code = this.generateCode()
    this.generated = new UnixTimestampService().generate()
    this.valid = true,
    this.uid = ""
    await this.ref.withConverter(converter).set(this)
    return this
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

  public async getFromId(): Promise<InvitationDBC> {
    if (this.id === null || this.id === undefined) throw new Error('Discord ID is required to fetch invitation.')
    const snap = await db.collection('invitations').doc(this.id).withConverter(converter).get()
    if (!snap.exists) throw new Error('Invitation not found in Firestore.')
    return snap.data()!
  }

  public async associate(): Promise<FirebaseFirestore.WriteResult> {
    if (this.uid === null || this.uid === undefined) throw new Error('uid needed to associate Invitation with user.')
    if (this.code === null || this.code === undefined) throw new Error('Code needed to associate Invitation with user.')
    const q = await db.collection('invitations').where('uid', '==', this.uid).get()
    if (q.empty) throw new Error('Invitation not found in Firestore.')
    return await q.docs[0].ref.update({
      uid: this.uid,
      code: this.code
    })


  }

  private async getFromCode(code?: string | undefined): Promise<InvitationDBC> {
    code ? code : this.code
    const invitation =  await db.collection('invitations').where('code', '==', code).withConverter(converter).get()
    if (invitation.empty) throw new Error('Invitation not found')
    return invitation.docs[0].data()
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

  public async existsInDatabase(): Promise<boolean> {
    const snap = await db.collection('invitations').doc(this.id!).get()
    return snap.exists
  }
}