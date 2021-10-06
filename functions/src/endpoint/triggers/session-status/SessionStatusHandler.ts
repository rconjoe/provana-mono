import SlotDBC from '../../../dbc/SlotDBC'
import SessionDBC from '../../../dbc/SessionDBC'
import ChatRoomDBC from '../../../dbc/ChatRoomDBC'
import TaskDBC from '../../../dbc/TaskDBC'
import TaskService from '../../../services/TaskService'
import TimeService from '../../../services/TimeService'
import NotificationDBC from '../../../dbc/NotificationDBC'

export default class SessionStatusHandler {
  session: SessionDBC 
  
  constructor(session: SessionDBC) {
    this.session = session
  }

  public async potential(): Promise<void> {
    if (this.session.status === 'published') {
      for (let i=1; i<=this.session.slots!; i++) {
        await new SlotDBC(
          "",
          this.session.name,
          i,
          this.session.slots,
          this.session.mandatoryFill,
          this.session.start,
          this.session.end,
          this.session.sellerUid,
          this.session.serviceDocId,
          "",
          "",
          "",
          'published',
          this.session.id,
          undefined
        ).publish()
      }
      await new ChatRoomDBC().initialize({
        id: this.session.id!,
        creator: this.session.sellerUid!,
        title: this.session.name!
      })
    }
  }

  public async published(): Promise<void> {
    switch (this.session.status) {
      case 'active':
        await new NotificationDBC(
          this.session.sellerUid!,
          'Starting',
          'Your session is starting now!',
        ).send()
      case 'full':
        if (this.session.mandatoryFill === true) {
          const secondsUntil = new TimeService().generate()
          const task = await new TaskService().scheduleSessionStart(this.session.id!, secondsUntil)
          await new TaskDBC(this.session.id!).write(task)
        }
        await new NotificationDBC(
          this.session.sellerUid!,
          'Full',
          `You've filled up one of your sessions. Nice job!`,
        ).send()
      case 'cancelled':
        // we really only care about this if booked > 0. 
        // it only happens when a *seller* cancels a session.
        // here we care to do the cancellation of any booked slots
        // if the seller so decides to proceed cancelling said session
      break
    }
  }

    public async full(): Promise<void> {
      switch (this.session.status) {
        case 'active':
          await new NotificationDBC(
            this.session.sellerUid!,
            'Starting',
            `Your session is starting!`,
          ).send()
        case 'cancelled': 
          // what goes here is handling a seller cancelling a full session. 
          // mandatoryFill should be checked and handled conditionally.
          // buyers cancelling is handled on the slot, but here the
          // slots should be forEach'd with buyer notifications.
          // this is why cancellation.onCreate would be a bad method for those,
          // since we'd have to fetch the data there that we already have in this handler.
        case 'published': 
          // if the session in question is mandatoryFill, here we should also
          // be cancelling session start task as well as handling the notification 
          // flow for when you need to tell everyone that a mandatoryFill session that was
          // full is now no longer full and someone needs to purchase the open slot
          // for it to happen. this change is triggerred in SlotStatusHandler.booked case 'cancelled'
          return
      }
    }

  public async active(): Promise<void> {
    switch (this.session.status) {
      case 'succeeded': 
        // we still need this session to stick around for review purposes
        break
    }
  }

  public async cancelled(): Promise<void> {
    switch (this.session.status) {
      case 'published':
        // calls on session republish
        return
    }
  }
}
