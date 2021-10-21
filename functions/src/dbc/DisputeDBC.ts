import Dispute from '../models/Dispute'
import { db } from '../config'
import * as dayjs from 'dayjs'

const converter = {
  toFirestore(dispute: DisputeDBC): FirebaseFirestore.DocumentData {
    return {
      slot: dispute.slot ? dispute.slot : '',
      buyer: dispute.buyer ? dispute.buyer : '',
      comments: dispute.comments ? dispute.buyer : '',
      details: dispute.details ? dispute.details : '',
      status: dispute.status ? dispute.status : '',
      staffId: dispute.staffId ? dispute.staffId : '',
      notes: dispute.notes ? dispute.notes : '',
      generated: dispute.generated ? dispute.generated : ''
    }
  },
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): DisputeDBC {
    const data = snapshot.data()
    return new DisputeDBC(
      data.slot,
      data.buyer,
      data.comments,
      data.details,
      data.status,
      data.staffId,
      data.notes,
      data.generated,
      snapshot.ref
    )
  }
}

export default class DisputeDBC extends Dispute {
  slot: string | undefined
  buyer: string | undefined
  comments: Array<string> | undefined
  details: string | undefined
  status: string | undefined
  staffId: string | undefined
  notes: Array<string> | undefined
  generated: number | undefined
  ref: FirebaseFirestore.DocumentReference | undefined

  constructor(
    slot?: string,
    buyer?: string,
    comments?: Array<string>,
    details?: string,
    status?: string,
    staffId?: string,
    notes?: Array<string>,
    generated?: number,
    ref?: FirebaseFirestore.DocumentReference
  ) {
    super(slot, buyer, comments, details, status, staffId, notes, generated)
    this.ref = ref
  }

  public toModel(): Dispute {
    return new Dispute(
      this.slot,
      this.buyer,
      this.comments,
      this.details,
      this.status,
      this.staffId,
      this.notes,
      this.generated
    )
  }

  // use this in dispute endpoint called from dash
  public async initialize(data: {
    slot: string,
    buyer: string,
    details: string,
  }): Promise<void> {
    await db
      .collection('disputes')
      .doc(data.slot)
    .set({
      slot: data.slot,
      buyer: data.buyer,
      details: data.details,
      status: 'disputed',
      generated: dayjs().unix()
    })
    .catch(err => {
      console.error(err)
    })
  }

  public async fetch(): Promise<Dispute> {
    if (this.slot === "" || this.slot === undefined) throw new Error('Slot ID requried to fetch dispute')
    const slot = await db 
      .collection('disputes')
      .doc(this.slot)
      .withConverter(converter)
      .get()
    return slot.data()!.toModel()
  }

  public async update(data: any): Promise<void> {
    if (this.slot === '' || this.slot === undefined) throw new Error('Pass ID in constructor to update dispute')
    await db.collection('disputes')
      .doc(this.slot)
      .update({...data})
    .catch(err => console.error(err))
  }
}
