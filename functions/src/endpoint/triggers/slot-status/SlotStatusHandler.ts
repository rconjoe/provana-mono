import SlotDBC from '../../../dbc/SlotDBC'
import SessionDBC from '../../../dbc/SessionDBC'
import ChatRoomDBC from '../../../dbc/ChatRoomDBC'
import CancellationDBC from '../../../dbc/CancellationDBC'
import TaskService from '../../../services/TaskService'
import TaskDBC from '../../../dbc/TaskDBC'
import StripePaymentIntentService from '../../../services/stripe/StripePaymentIntentService'
import NotificationDBC from '../../../dbc/NotificationDBC'
import {EventContext} from 'firebase-functions/v1'

export default class SlotStatusHandler {
  slot: SlotDBC
  context: EventContext

  constructor(slot: SlotDBC, context: EventContext) {
    this.slot = slot
    this.context = context
  }

  public async published(): Promise<void> {
    if (this.slot.status === 'holding') {
      const task = await new TaskService().onCheckout(this.slot.id!)
      await new TaskDBC(this.slot.id!).write(task)
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
        if (this.slot.mandatoryFill === false) {
          const seconds = 300 + this.slot.start!
          const task = await new TaskService().scheduleCapture(this.slot.id!, seconds)
          await new TaskDBC(this.slot.id!).write(task)
        }
        await new NotificationDBC(
          this.slot.buyerUid!,
          'Starting',
          'Your session is starting now!',
        ).send()
        break
      case 'cancelled':
        let session = new SessionDBC()
        await new CancellationDBC(this.slot.toModel()).create(this.slot.buyerUid!)
        await session.decrement(this.slot.parentSession!)
        await new ChatRoomDBC().removeFromRoom(this.slot.buyerUid!, this.slot.parentSession!)
        await new StripePaymentIntentService().cancel(this.slot.paymentIntent!)
        if (!this.slot.mandatoryFill) {
          await this.cancelSlotTask(this.slot.id!)
        }
        await this.slot.republish()
        await new NotificationDBC(
          this.slot.sellerUid!,
          "Cancellation",
          "A booking has been cancelled by the buyer. Your schedule has been updated.",
        ).send()
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
    return
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
  //}

  private async cancelSlotTask(slotId: string): Promise<void> {
    const task = await new TaskDBC(slotId).retrieve()
    await new TaskService().cancel(task)
    await new TaskDBC().delete(slotId)
  }

  //private async onDispute(): Promise<void> {
  //  console.log('disputed')
  //}
}
