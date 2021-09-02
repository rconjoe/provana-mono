import Slot from '../models/Slot'
import { db } from '../config'

const converter = {
  toFirestore(s: Slot): FirebaseFirestore.DocumentData {
    return {
      id: s.id ? s.id : "",
      name: s.name ? s.name : "",
      slot: s.slot ? s.slot : 1,
      slots: s.slots ? s.slots : 1,
      start: s.start ? s.start : 0,
      end: s.end ? s.end : 0,
      sellerUid: s.sellerUid ? s.sellerUid : "",
      serviceDocId: s.serviceDocId ? s.serviceDocId : "",
      buyerUid: s.buyerUid ? s.buyerUid : "",
      buyerUsername: s.buyerUsername ? s.buyerUsername : "",
      paymentIntent: s.paymentIntent ? s.paymentIntent : "",
      status: s.status ? s.status : "",
      parentSession: s.parentSession ? s.parentSession : "",
    }
  },
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): SlotDBC {
    const data = snapshot.data()
    return new SlotDBC(
      data.id,
      data.name,
      data.slot,
      data.slots,
      data.start,
      data.end,
      data.sellerUid,
      data.serviceDocId,
      data.buyerUid,
      data.buyerUsername,
      data.paymentIntent,
      data.status,
      data.parentSession,
      snapshot.ref
    )
  }
}

export default class SlotDBC extends Slot {
  ref: FirebaseFirestore.DocumentReference | undefined

  constructor(
    id?: string,
    name?: string,
    slot?: number,
    slots?: number,
    start?: number,
    end?: number,
    sellerUid?: string,
    serviceDocId?: string,
    buyerUid?: string,
    buyerUsername?: string,
    paymentIntent?: string,
    status?: string,
    parentSession?: string,
    ref?: FirebaseFirestore.DocumentReference
  ) {
    super(
      id,
      name,
      slot,
      slots,
      start,
      end,
      sellerUid,
      serviceDocId,
      buyerUid,
      buyerUsername,
      paymentIntent,
      status,
      parentSession
    )
    this.ref = ref
  }

  public toModel(): Slot {
    return new Slot(
      this.id,
      this.name,
      this.slot,
      this.slots,
      this.start,
      this.end,
      this.sellerUid,
      this.serviceDocId,
      this.buyerUid,
      this.buyerUsername,
      this.paymentIntent,
      this.status,
      this.parentSession
    )
  }

  public async publish(): Promise<FirebaseFirestore.WriteResult> {
    if (this.parentSession === undefined || this.parentSession === "") throw new Error("need parenSession ID")
    const newDoc = db.collection('sessions').doc(this.parentSession).collection('slots').doc()
    this.id = newDoc.id
    return await newDoc.withConverter(converter).set(this)
  }

  public async setPath(session: string, id: string): Promise<SlotDBC> {
    this.parentSession = session
    this.id = id
    return this
  }

  public async update(data: any): Promise<FirebaseFirestore.WriteResult> {
    if (this.ref === null || this.ref === undefined) throw new Error('Ref required to update slot')
    return await this.ref.update({...data})
    .catch(err => {
      throw new Error(err)
    })
  }

}