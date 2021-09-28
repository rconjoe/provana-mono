import { Change } from 'firebase-functions'
import SlotDBC from '../../../dbc/SlotDBC'
import SessionDBC from '../../../dbc/SessionDBC'
import ChatRoomDBC from '../../../dbc/ChatRoomDBC'
import TimeService from '../../../services/TimeService'
import TaskService from '../../../services/TaskService'
import TaskDBC from '../../../dbc/TaskDBC'
import StripePaymentIntentService from '../../../services/stripe/StripePaymentIntentService'
import NotificationDBC from '../../../dbc/NotificationDBC';


export default class SlotStatusHandler {
  before: SlotDBC | undefined
  after: SlotDBC | undefined

  public async run(change: Change<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>>) {
    this.before = this.toDbc(change.before)
    this.after = this.toDbc(change.after)
    const bStatus = this.before.status
    const aStatus = this.after.status
    if (bStatus === 'published' && aStatus === 'holding') {
      this.onHolding()
    }
    else if (bStatus === 'holding' && aStatus === 'booked') {
      this.onPurchase()
    }
    else if (bStatus === 'booked' && aStatus === 'active') {
      this.onActive()
    }
    else if (bStatus === 'booked' && aStatus === 'cancelled') {
      this.onCancel()
    }
    else if (bStatus === 'active' && aStatus === 'disputed') {
      this.onDispute()
    }
  }

  private toDbc(snapshot: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>) {
    const data = snapshot.data()
    return new SlotDBC(
      snapshot.id,
      data.name,
      data.slot,
      data.slots,
      data.mandatoryFill,
      data.start,
      data.end,
      data.sellerUid,
      data.serviceDocId,
      data.buyerUid,
      data.buyerUsername,
      data.paymentIntent,
      data.status,
      data.parentSession,
      snapshot.ref
    )
  }

  private async onHolding(): Promise<void> {
    await new TaskService().onCheckout(this.after!.id!)
  }

  private async onPurchase(): Promise<void> {
    const a = this.after!
    await new SessionDBC().increment(a.parentSession!)
    await new ChatRoomDBC().addToRoom(a.buyerUid!, a.parentSession!)
    a.mandatoryFill ? await this.checkFill() : await this.scheduleSlotStart()
    
    // Here we need to be sending notification and potentially mail etc etc:
    //
    // const creator = await new CreatorDBC(a.sellerUid).fetchByUid()
    // const dateTime = new TimeService().toLocalDateTime(a.start!, creator.timezone!)
    // return await new MailService(creator.email!).slotSold({
    //   username: creator.username!,
    //   service: a.name!,
    //   buyer: a.buyerUsername!,
    //   time: dateTime.time,
    //   date: dateTime.date
    // })
    const notif = new NotificationDBC(a.sellerUid!,"Session Purchased!","A user has purchased a session with you, please check your dashboard",true);
  }

  private async checkFill(): Promise<void> {
    const id = this.after!.parentSession!
    const session = await new SessionDBC().fetch(id)
    if (session.booked === session.slots) {
      await session.update({ status: 'full' })
    }
  }

  private async scheduleSlotStart(): Promise<void> {
    const a = this.after!
    const secondsUntil = a.start! - new TimeService().generate()
    const task = await new TaskService().scheduleSlotStart(a.id!, secondsUntil)
    await new TaskDBC(a.id!).write(task)
  }

  private async onActive(): Promise<void> {
    const a = this.after!
    const secondsUntil = 10800 + a.end!
    const task = await new TaskService().scheduleCapture(a.id!, secondsUntil)
    await new TaskDBC(a.id!).write(task)
  }

  private async onCancel(): Promise<void> {
    const a = this.after!
    await new SessionDBC().decrement(a.parentSession!)
    await new ChatRoomDBC().removeFromRoom(a.buyerUid!, a.parentSession!)
    await new StripePaymentIntentService().cancel(a.paymentIntent!)
    a.mandatoryFill ? await new SessionDBC().onSlotCancel(a.parentSession!) : this.cancelSlotTask(a.id!)
    await a.republish()
  }

  private async cancelSlotTask(slotId: string): Promise<void> {
    const task = await new TaskDBC(slotId).retrieve()
    await new TaskService().cancel(task)
  }

  private async onDispute(): Promise<void> {
    console.log('disputed')
  }
}
