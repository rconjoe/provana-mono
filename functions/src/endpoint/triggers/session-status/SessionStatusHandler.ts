import { Change } from 'firebase-functions'
import SlotDBC from '../../../dbc/SlotDBC'
import SessionDBC from '../../../dbc/SessionDBC'
import ChatRoomDBC from '../../../dbc/ChatRoomDBC'
import TaskDBC from '../../../dbc/TaskDBC'
import TaskService from '../../../services/TaskService'
import TimeService from '../../../services/TimeService'
import NotificationDBC from '../../../dbc/NotificationDBC'

export default class SessionStatusHandler {
  before: SessionDBC | undefined
  after: SessionDBC | undefined

  public async run(change: Change<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>>) {
    this.before = this.toDbc(change.before)
    this.after = this.toDbc(change.after)
    const bStatus = this.before.status
    const a = this.after!
    const aStatus = a.status
    if (bStatus === 'potential' && aStatus === 'published') {
      this.onPublish()
    }
    else if (bStatus === 'published' && aStatus === 'full') {
      this.onFull()
    }
    else if (bStatus === 'full' && aStatus === 'published') {
      this.onSlotCancelWhenFull()
    }
    else if (bStatus === 'published' && aStatus === 'active') {
      this.onActive();
    }
    else if (bStatus === 'full' && aStatus === 'active') {
      this.onActive();
    }
  }

  private toDbc(snapshot: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>): SessionDBC {
    const data = snapshot.data()
    return new SessionDBC(
      data.sellerUid,
      data.slots,
      data.booked,
      data.serviceDocId,
      data.mandatoryFill,
      data.name,
      data.color,
      data.serviceColor,
      data.start,
      data.end,
      snapshot.id,
      data.status,
      snapshot.ref
    )
  }

  private async onPublish(): Promise<void> {
    const a = this.after!
    for (let i=1; i<=a.slots!; i++) {
      await new SlotDBC(
        "",
        a.name,
        i,
        a.slots,
        a.mandatoryFill,
        a.start,
        a.end,
        a.sellerUid,
        a.serviceDocId,
        "",
        "",
        "",
        'published',
        a.id,
        undefined
      ).publish()
    }
    await new ChatRoomDBC().initialize({
      id: a.id!,
      creator: a.sellerUid!,
      title: a.name!
    })
    return
  }

  private async onActive(): Promise<void> {
    const a = this.after!
    const notif = new NotificationDBC(a.sellerUid!,"Cancellation","A user has cancled their session with you, please check your dashboard",true);
  }

  private async onFull(): Promise<void> {
    const a = this.after!
    if (a.mandatoryFill === true) {
      const secondsUntil = new TimeService().generate()
      const task = await new TaskService().scheduleSessionStart(a.id!, secondsUntil)
      await new TaskDBC(a.id!).write(task)
    }
  }

  private async onSlotCancelWhenFull(): Promise<void> {
    const task = await new TaskDBC(this.after!.id!).retrieve()
    await new TaskService().cancel(task)
  }
}
