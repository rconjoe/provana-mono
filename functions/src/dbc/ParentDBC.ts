import ParentSession from '../models/ParentSession'
import { db } from '../config'

const converter = {
  toFirestore(parent: ParentDBC): FirebaseFirestore.DocumentData {
    return {
      sellerUid: parent.sellerUid ? parent.sellerUid : "",
      slots: parent.slots ? parent.slots : 1,
      serviceDocId: parent.serviceDocId ? parent.serviceDocId : "",
      mandatoryFill: parent.mandatoryFill ? parent.mandatoryFill : true,
      name: parent.name ? parent.name : "",
      color: parent.color ? parent.color : "",
      serviceColor: parent.serviceColor ? parent.serviceColor : "",
      start: parent.start ? parent.start : 0,
      end: parent.end ? parent.end : 0,
      id: parent.id ? parent.id : "",
      status: parent.status ? parent.status : "",
    }
  },
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): ParentDBC {
    const data = snapshot.data()
    return new ParentDBC(
      data.sellerUid,
      data.slots,
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

export default class ParentDBC extends ParentSession {
  ref: FirebaseFirestore.DocumentReference | undefined

  constructor(
    sellerUid?: string,
    slots?: number,
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
    super(sellerUid, slots, serviceDocId, mandatoryFill, name, color, serviceColor, start, end, id, status)
    this.ref = ref
  }

  public async publish(): Promise<void> {
    return
  }

}