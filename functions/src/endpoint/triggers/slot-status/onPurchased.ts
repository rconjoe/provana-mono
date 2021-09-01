import * as functions from 'firebase-functions'
import CreatorDBC from '../../../dbc/CreatorDBC'
import MailService from '../../../services/mailer/MailService'
import TimeService from '../../../services/TimeService'

export const onSlotPurchased = functions
  .firestore
  .document('session/{sessionId}/slots/{slotId}')
  .onUpdate(async (change, context): Promise<void> => {
    const b = change.before.data()
    const a = change.after.data()
    if (b.status === 'holding' && a.status === 'purchased') {
      const creator = await new CreatorDBC(b.sellerUid).fetchByUid()
      const dateTime = new TimeService().toLocalDateTime(b.start, creator.timezone!)
      await new MailService('jcarlton1227@gmail.com').slotSold({
        serviceName: b.name,
        sellerUsername: creator.username!,
        buyerUsername: b.buyerUsername,
        time: dateTime.date,
        date: dateTime.date
      })
    }
    else return
  })