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
          true
        ).send()
      case 'full':
        if (this.session.mandatoryFill === true) {
          const secondsUntil = new TimeService().generate()
          const task = await new TaskService().scheduleSessionStart(this.session.id!, secondsUntil)
          await new TaskDBC(this.session.id!).write(task)
        }
      break
      case 'cancelled':
        // ...
      break
    }
  }

    public async full(): Promise<void> {
      switch (this.session.status) {
        case 'active':
          await new NotificationDBC(
            this.session.sellerUid!,
            'Starting',
            `You've filled up one of your sessions. Nice job!`,
            true
          ).send()
        case 'cancelled': 
          // decide how much of deletion and notif/mail handling goes here (ideally most/all of it)
        break
      }
    }

  public async active(): Promise<void> {
    switch (this.session.status) {
      case 'succeeded': 
        // we still need this session to stick around for review purposes
        break
    }
  }
}
