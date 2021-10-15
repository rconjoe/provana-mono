import Dispute from '../models/Dispute'
import { db } from '../config'

// const converter = {
//   toFirestore(dispute: DisputeDBC): FirebaseFirestore.DocumentData {
//     return {
//       slot: dispute.slot ? dispute.slot : '',
//       buyer: dispute.buyer ? dispute.buyer : '',
//       details: dispute.details ? dispute.details : '',
//       status: dispute.status ? dispute.status : '',
//       staffId: dispute.staffId ? dispute.staffId : '',
//       notes: dispute.notes ? dispute.notes : ''
//     }
//   },
//   fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): DisputeDBC {
//     const data = snapshot.data()
//     return new DisputeDBC(
//       data.slot,
//       data.buyer,
//       data.details,
//       data.status,
//       data.staffId,
//       data.notes
//       snapshot.ref
//     )
//   }
// }

export default class DisputeDBC extends Dispute {
  slot: string | undefined
  buyer: string | undefined
  comments: Array<string> | undefined
  details: string | undefined
  status: string | undefined
  staffId: string | undefined
  notes: Array<string> | undefined
  ref: FirebaseFirestore.DocumentReference | undefined

  constructor(
    slot?: string,
    buyer?: string,
    comments?: Array<string>,
    details?: string,
    status?: string,
    staffId?: string,
    notes?: Array<string>,
    ref?: FirebaseFirestore.DocumentReference
  ) {
    super(slot, buyer, comments, details, status, staffId, notes)
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
      this.notes
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
      status: 'disputed'
    })
    .catch(err => {
      console.error(err)
    })
  }

}
