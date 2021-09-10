import Session from '../models/Session'
import { db, increment, decrement } from '../config'

const converter = {
  toFirestore(s: SessionDBC): FirebaseFirestore.DocumentData {
    return {
      sellerUid: s.sellerUid ? s.sellerUid : "",
      slots: s.slots ? s.slots : 1,
      booked: s.booked ? s.booked : 1,
      serviceDocId: s.serviceDocId ? s.serviceDocId : "",
      mandatoryFill: s.mandatoryFill ? s.mandatoryFill : "",
      name: s.name ? s.name : "",
      color: s.color ? s.color : "",
      serviceColor: s.serviceColor ? s.serviceColor : "",
      start: s.start ? s.start : 0,
      end: s.end ? s.end : 0,
      id: s.id ? s.id : "",
      status: s.status ? s.status : "",
    }
  },
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): SessionDBC {
    const data = snapshot.data()
    return new SessionDBC(
      data.sellerUid,
      data.slots,
      data.booked,
      data.serviceDocId,
      data.mandatoryFill,
      data.name,
      data.color,
      data.serviceColor,
      data.start,
      data.end,
      data.id,
      data.status,
      snapshot.ref
    )
  }
}

export default class SessionDBC extends Session {
  ref: FirebaseFirestore.DocumentReference | undefined

  constructor(
    sellerUid?: string,
    slots?: number,
    booked?: number,
    serviceDocId?: string,
    mandatoryFill?: boolean,
    name?: string,
    color?: string,
    serviceColor?: string,
    start?: number,
    end?: number,
    id?: string,
    status?: string,
    ref?: FirebaseFirestore.DocumentReference
  ) {
    super(sellerUid, slots, booked, serviceDocId, mandatoryFill, name, color, serviceColor, start, end, id, status)
    this.ref = ref
  }

  public setSellerUid(uid: string): SessionDBC {
    this.sellerUid = uid
    return this
  }

  public async publish(): Promise<void> {
    const potentials = await this.fetchPotentials()
    potentials.forEach(async (session) => {
      return await session.ref!.update({
        color: session.serviceColor,
        status: 'published'
      })
    })
  }

  public async fetch(id: string): Promise<SessionDBC> {
    const session = await db
      .collection('sessions')
      .doc(id)
      .withConverter(converter)
      .get()
    return session.data()!
  }

  private async fetchPotentials(): Promise<Array<SessionDBC>> {
    if (this.sellerUid === undefined) throw new Error('Missing sellerUid')
    let a: Array<SessionDBC> = []
    const q = await db.collection('sessions').where('sellerUid', '==', this.sellerUid)
      .where('status', '==', 'potential').withConverter(converter).get()
    q.forEach(doc => {
      a.push(doc.data())
    })
    return a
  }

  public async increment(id: string): Promise<void> {
    await increment({
      ref: db.collection('sessions').doc(id),
      field: 'booked',
      amount: 1
    })
  }

  public async decrement(id: string): Promise<void> {
    await decrement({
      ref: db.collection('sessions').doc(id),
      field: 'booked',
      amount: 1
    })
  }

}
