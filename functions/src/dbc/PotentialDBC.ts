import PotentialSession from '../models/PotentialSession'
import { db } from '../config'

const converter = {
  toFirestore(p: PotentialDBC): FirebaseFirestore.DocumentData {
    return {
      name: p.name ? p.name : "",
      slots: p.slots ? p.slots : 1,
      mandatoryFill: p.mandatoryFill ? p.mandatoryFill : false,
      color: p.color ? p.color : "",
      serviceColor: p.serviceColor ? p.serviceColor : "",
      start: p.start ? p.start : 0,
      end: p.end ? p.end : 0,
      sellerUid: p.sellerUid ? p.sellerUid : "",
      serviceDocId: p.serviceDocId ? p.serviceDocId : "",
      status: p.status ? p.status : 'potential',
      id: p.id ? p.id : "",
    }
  },
  fromFirestore(snapshot: FirebaseFirestore.DocumentData): PotentialDBC {
    const data = snapshot.data()
    return new PotentialDBC(
      data.name,
      data.slots,
      data.mandatoryFill,
      data.color,
      data.serviceColor,
      data.start,
      data.end,
      data.sellerUid,
      data.serviceDocId,
      data.status,
      data.id,
      snapshot.ref
    )
  }
}


export default class PotentialDBC extends PotentialSession {
  ref: FirebaseFirestore.DocumentReference | undefined

  constructor(
    name?: string,
    slots?: number,
    mandatoryFill?: boolean,
    color?: string,
    serviceColor?: string,
    start?: number,
    end?: number,
    sellerUid?: string,
    serviceDocId?: string,
    status?: string,
    id?: string,
    ref?: FirebaseFirestore.DocumentReference
  ) {
    super(name, slots, mandatoryFill, color, serviceColor, start, end, sellerUid, serviceDocId, status, id)
    this.ref = ref
  }

  public toModel(): PotentialSession {
    return new PotentialSession(
      this.name,
      this.slots,
      this.mandatoryFill,
      this.color,
      this.serviceColor,
      this.start,
      this.end,
      this.sellerUid,
      this.serviceDocId,
      this.status,
      this.id
    )
  }

  public setSellerUid(uid: string): PotentialDBC {
    this.sellerUid = uid
    return this
  }

  public async fetchByUid(): Promise<Array<PotentialDBC>> {
    if (this.sellerUid === null || this.sellerUid === undefined) throw new Error('UID required!')
    let a: Array<PotentialDBC> = []
    const q = await db
      .collection('sessions')
      .where('sellerUid', '==', this.sellerUid)
      .where('status', '==', 'potential')
      .withConverter(converter)
      .get()
    q.forEach(doc => a.push(doc.data()))
    return a
  }
}