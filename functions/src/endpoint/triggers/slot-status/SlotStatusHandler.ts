import SlotDBC from '../../../dbc/SlotDBC'
import SessionDBC from '../../../dbc/SessionDBC'
import ChatRoomDBC from '../../../dbc/ChatRoomDBC'
// import TimeService from '../../../services/TimeService'
import TaskService from '../../../services/TaskService'
// import TaskDBC from '../../../dbc/TaskDBC'
// import StripePaymentIntentService from '../../../services/stripe/StripePaymentIntentService'
// import NotificationDBC from '../../../dbc/NotificationDBC';


export default class SlotStatusHandler {
  slot: SlotDBC

  constructor(slot: SlotDBC) {
    this.slot = slot
  }

  public async published(): Promise<void> {
    if (this.slot.status === 'holding') {
      await new TaskService().onCheckout(this.slot.id!)
    }
  }

  public async holding(): Promise<void> {
    if (this.slot.status === 'booked') {
      await new SessionDBC().increment(this.slot.parentSession!)
      await new ChatRoomDBC().addToRoom(this.slot.buyerUid!, this.slot.parentSession!)
    }
  }

  public async booked(): Promise<void> {
    switch (this.slot.status) {
      case 'active':
        break
      case 'cancelled':
        break
    }
  }

  public async active(): Promise<void> {
    switch (this.slot.status) {
      case 'succeeded':
        break
      case 'disputed':
        break
    }
  }

  public async cancelled(): Promise<void> {
    if (this.slot.status === 'published') {
      return
    }
  }

  public async disputed(): Promise<void> {
    switch (this.slot.status) {
      case 'resolved_pos':
        break
      case 'resolved_neg':
        break
    }
  }

  //private async onPurchase(): Promise<void> {
  //  const a = this.after!
  //  await new SessionDBC().increment(a.parentSession!)
  //  await new ChatRoomDBC().addToRoom(a.buyerUid!, a.parentSession!)
  //  a.mandatoryFill ? await this.checkFill() : await this.scheduleSlotStart()
    
  //  await new NotificationDBC(a.sellerUid!,"Session Purchased!","A user has purchased a session with you, please check your dashboard",true).send()
  //}

  //private async checkFill(): Promise<void> {
  //  const id = this.after!.parentSession!
  //  const session = await new SessionDBC().fetch(id)
  //  if (session.booked === session.slots) {
  //    await session.update({ status: 'full' })
  //  }
  //}

  //private async scheduleSlotStart(): Promise<void> {
  //  const a = this.after!
  //  const secondsUntil = a.start! - new TimeService().generate()
  //  const task = await new TaskService().scheduleSlotStart(a.id!, secondsUntil)
  //  await new TaskDBC(a.id!).write(task)
  //}

  //private async onActive(): Promise<void> {
  //  const a = this.after!
  //  const secondsUntil = 10800 + a.end!
  //  const task = await new TaskService().scheduleCapture(a.id!, secondsUntil)
  //  await new TaskDBC(a.id!).write(task)
  //}

  //private async onCancel(): Promise<void> {
  //  const a = this.after!
  //  await new SessionDBC().decrement(a.parentSession!)
  //  await new ChatRoomDBC().removeFromRoom(a.buyerUid!, a.parentSession!)
  //  await new StripePaymentIntentService().cancel(a.paymentIntent!)
  //  a.mandatoryFill ? await new SessionDBC().onSlotCancel(a.parentSession!) : this.cancelSlotTask(a.id!)
  //  await a.republish()
  //}

  //private async cancelSlotTask(slotId: string): Promise<void> {
  //  const task = await new TaskDBC(slotId).retrieve()
  //  await new TaskService().cancel(task)
  //}

  //private async onDispute(): Promise<void> {
  //  console.log('disputed')
  //}
}
