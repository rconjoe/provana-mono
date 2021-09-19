import { Change } from 'firebase-functions'
import SlotDBC from '../../../dbc/SlotDBC'
import SessionDBC from '../../../dbc/SessionDBC'
import ChatRoomDBC from '../../../dbc/ChatRoomDBC'

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
  }

  private async onFull(): Promise<void> {
    // haha whatever ( •́ ⌣ •̀ )⌐╦╦═─
  }
}
