import { db } from '../config'
import Slot from '../models/Slot'
import TimeService from '../services/TimeService'

export default class CancellationDBC {
  slot: Slot
  cancelledAt: number
  cancelledBy: string | undefined

  constructor(slot: Slot) {
    this.slot = slot
    this.cancelledAt = new TimeService().generate()
  }

  public async create(uid: string): Promise<void> {
    db.collection('cancellations').doc(this.slot!.id!).set({
      ...this.slot,
      cancelledAt: this.cancelledAt,
      cancelledBy: uid,
    })
  }
}
