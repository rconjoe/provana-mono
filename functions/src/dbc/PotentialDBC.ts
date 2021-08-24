import PotentialSession from '../models/PotentialSession'
import { db } from '../config'
import SessionDBC from './SessionDBC'
import ParentDBC from './ParentDBC'
import IFilteredPotentials from '../models/IFilteredPotentials'

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

  public async publishAll(): Promise<void> {
    const potentials = await this.fetchByUid()
    const filtered = this.filter(potentials)
    filtered.parents.forEach(async (parent) => {
      return await parent.publish()
    })
    filtered.sessions.forEach(async (session) => {
      return await session.publish()
    })
  }

  private filter(potentials: Array<PotentialDBC>): IFilteredPotentials {
    let parents: Array<ParentDBC> = []
    let sessions: Array<SessionDBC> = []
    potentials.forEach((s) => {
      if (s.slots! > 1) {
        parents.push(new ParentDBC(
          s.sellerUid,
          s.slots,
          s.serviceDocId,
          s.mandatoryFill,
          s.name,
          s.color,
          s.serviceColor,
          s.start,
          s.end,
          s.id,
          s.status,
          s.ref
        ))
      }
      else {
        sessions.push(new SessionDBC(
          s.id,
          s.sellerUid,
          "",
          "",
          "",
          s.serviceDocId,
          s.name,
          s.color,
          s.serviceColor,
          s.start,
          s.end,
          s.status,
          s.ref
        ))
      }
    })
    return { parents, sessions }
  }

  private async fetchByUid(): Promise<Array<PotentialDBC>> {
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