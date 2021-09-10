import * as functions from 'firebase-functions'
import CreatorDBC from '../../../dbc/CreatorDBC'
import SessionDBC from '../../../dbc/SessionDBC'
import ChatRoomDBC from '../../../dbc/ChatRoomDBC'
import MailService from '../../../services/mailer/MailService'
import TimeService from '../../../services/TimeService'
import TaskService from '../../../services/TaskService'
import TaskDBC from '../../../dbc/TaskDBC'

const checkFill = async (sessionId: string): Promise<void> => {
  const session = await new SessionDBC().fetch(sessionId)
  if (session.booked === session.slots) {
    const secondsUntil = session.start! - new TimeService().generate()
    console.log(secondsUntil)
    const task = await new TaskService().scheduleSessionStart(sessionId, secondsUntil)
    await new TaskDBC(sessionId).write(task)
  }
  else return
}

const scheduleSlotTask = async (slotId: string, start: number): Promise<void> => {
  const secondsUntil = start - new TimeService().generate()
  console.log(secondsUntil)
  const task = await new TaskService().scheduleSlotStart(slotId, secondsUntil)
  return await new TaskDBC(slotId).write(task)
}

export const onSlotPurchased = functions
  .firestore
  .document('session/{sessionId}/slots/{slotId}')
  .onUpdate(async (change, context): Promise<string|void> => {
    const b = change.before.data()
    const a = change.after.data()
    if (b.status === 'holding' && a.status === 'booked') {
      await new ChatRoomDBC().addToRoom(a.buyerUid, a.parentSession)
      await new SessionDBC().increment(a.parentSession)
      a.mandatoryFill ? await checkFill(a.parentSession) : await scheduleSlotTask(a.id, a.start)
      const creator = await new CreatorDBC(b.sellerUid).fetchByUid()
      const dateTime = new TimeService().toLocalDateTime(b.start, creator.timezone!)
      return await new MailService(creator.email!).slotSold({
        username: creator.username!,
        service: b.name,
        buyer: b.buyerUsername,
        time: dateTime.time,
        date: dateTime.date
      })
    }
    else return
  })
