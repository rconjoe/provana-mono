import ParentSession from '../models/ParentSession'
import { db } from '../config'
import SlotDBC from '../dbc/SlotDBC'

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

  public async publish(): Promise<FirebaseFirestore.WriteResult> {
    if (this.id === undefined || this.id === "") throw new Error('ID required to publish slots!')
    if (this.slots === undefined || this.slots === 0) throw new Error('need slots!')
    for(let i=0; i<this.slots!; i++) {
      const newRef = db.collection('sessions').doc(this.id).collection('slots').doc()
      const slotNo = i+1
      const slot = new SlotDBC(
        newRef.id,
        this.name,
        slotNo,
        this.slots,
        this.start,
        this.end,
        this.sellerUid,
        this.serviceDocId,
        "",
        "",
        "",
        'published',
        this.id,
        newRef
      )
      return await slot.publish()
    }
    this.ref = db.collection('sessions').doc(this.id)
    return await this.ref.update({
      color: this.serviceColor,
      status: 'published'
    })
  }

}