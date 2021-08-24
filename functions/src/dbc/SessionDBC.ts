import { db } from '../config'
import Session from '../models/Session'

const converter = {
  toFirestore(session: Session): FirebaseFirestore.DocumentData {
    return {
      id: session.id ? session.id : "",
      sellerUid: session.sellerUid ? session.sellerUid : "",
      buyerUid: session.buyerUid ? session.buyerUid : "",
      buyerUsername: session.buyerUsername ? session.buyerUsername : "",
      paymentIntent: session.paymentIntent ? session.paymentIntent : "",
      serviceDocId: session.serviceDocId ? session.serviceDocId : "",
      name: session.name ? session.name : "",
      color: session.color ? session.color : "",
      serviceColor: session.serviceColor ? session.serviceColor : "",
      start: session.start ? session.start : 0,
      end: session.end ? session.end : 0,
      status: session.status ? session.status : "",
    }
  },
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): SessionDBC {
    const data = snapshot.data()
    return new SessionDBC(
      data.id,
      data.sellerUid,
      data.buyerUid,
      data.buyerUsername,
      data.paymentIntent,
      data.serviceDocId,
      data.name,
      data.color,
      data.serviceColor,
      data.start,
      data.end,
      data.status,
      snapshot.ref
    )
  }
}

export default class SessionDBC extends Session {
  ref: FirebaseFirestore.DocumentReference | undefined

  constructor(
    id?: string,
    sellerUid?: string,
    buyerUid?: string,
    buyerUsername?: string,
    paymentIntent?: string,
    serviceDocId?: string,
    name?: string,
    color?: string,
    serviceColor?: string,
    start?: number,
    end?: number,
    status?: string,
    ref?: FirebaseFirestore.DocumentReference
  ) {
    super(id, sellerUid, buyerUid, buyerUsername, paymentIntent, serviceDocId, name, color, serviceColor, start, end, status)
    this.ref = ref
  }

  public async publish(): Promise<FirebaseFirestore.WriteResult> {
    return await this.ref!.update({
      color: this.serviceColor,
      status: 'published'
    })
  }
}