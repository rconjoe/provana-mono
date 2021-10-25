import SlotDBC from '../../../dbc/SlotDBC'
import SessionDBC from '../../../dbc/SessionDBC'
import ChatRoomDBC from '../../../dbc/ChatRoomDBC'
import CancellationDBC from '../../../dbc/CancellationDBC'
import TaskService from '../../../services/TaskService'
import TaskDBC from '../../../dbc/TaskDBC'
import StripePaymentIntentService from '../../../services/stripe/StripePaymentIntentService'
import NotificationDBC from '../../../dbc/NotificationDBC'
import DisputeDBC from '../../../dbc/DisputeDBC'
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
      if (this.slot.mandatoryFill === false) {
        const task = await new TaskService().scheduleSlotStart(this.slot.id!, this.slot.start!)
        await new TaskDBC(this.slot.id!).write(task)
      }
      // else {
      //   await new NotificationDBC(
      //     this.slot.buyerUid!,
      //     category: 'This session wont happen until its full etc etc even though you bought it',
      //     content: '',
      //   )
      // }
    }
  }

  public async booked(): Promise<void> {
    switch (this.slot.status) {
      case 'active':
        const task = await new TaskService().scheduleCapture(this.slot.id!, this.slot.start!)
        await new TaskDBC(this.slot.id!).write(task)
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
        if (this.slot.mandatoryFill === false) {
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
    if (this.slot.status === 'disputed') {
      const capture = await new TaskDBC(this.slot.id).retrieve()
      await new TaskService().cancel(capture)
      const release = await new TaskService().scheduleRelease(this.slot.id!, this.slot.start!)
      await new TaskDBC(this.slot.id).write(release)
    }
    return
  }

  public async cancelled(): Promise<void> {
    return
  }

  public async disputed(): Promise<void> {
    switch (this.slot.status) {
      case 'resolved-seller':
        await new DisputeDBC(this.slot.id).update({ status: 'resolved-seller' })
        await new StripePaymentIntentService().cancel(this.slot.paymentIntent!)
        await new NotificationDBC(
          this.slot.buyerUid!,
          'dispute-resolved',
          `Your claim on "${this.slot.name}" has been resolved, and you will not be charged.`
        ).send()
        break
      case 'resolved-refunded':
        await new StripePaymentIntentService().cancel(this.slot.paymentIntent!)
        await new NotificationDBC(
          this.slot.buyerUid!,
          'dispute-resolved',
          `Your claim on "${this.slot.name}" has been resolved, and you will not be charged.`
        ).send()
        break
      case 'resolved-captured':
        await new DisputeDBC(this.slot.id).update({ status: 'resolved-capture' })
        const release = await new TaskDBC(this.slot.id).retrieve()
        await new TaskService().cancel(release)
        await new StripePaymentIntentService().capture(this.slot.paymentIntent!)
        break
    }
  }

  private async cancelSlotTask(slotId: string): Promise<void> {
    const task = await new TaskDBC(slotId).retrieve()
    await new TaskService().cancel(task)
    await new TaskDBC().delete(slotId)
  }

}
