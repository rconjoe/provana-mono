import * as functions from 'firebase-functions'
import CreatorDBC from '../../../dbc/CreatorDBC'
import ChatRoomDBC from '../../../dbc/ChatRoomDBC'
import MailService from '../../../services/mailer/MailService'
import TimeService from '../../../services/TimeService'

export const onSlotPurchased = functions
  .firestore
  .document('session/{sessionId}/slots/{slotId}')
  .onUpdate(async (change, context): Promise<string|void> => {
    const b = change.before.data()
    const a = change.after.data()
    if (b.status === 'holding' && a.status === 'purchased') {
      await new ChatRoomDBC().addToRoom(a.buyerUid, a.parentSession)

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
