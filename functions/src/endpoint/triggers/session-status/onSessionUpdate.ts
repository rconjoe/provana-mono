import * as functions from 'firebase-functions'
import SessionStatusHandler from './SessionStatusHandler'
import SessionDBC from '../../../dbc/SessionDBC'

export const onSessionUpdate = functions
  .firestore
  .document('sessions/{sessionId}')
  .onUpdate(async (change, context) => {
    const b = change.before.get('status')
    const _ = change.after.data()
    const session = new SessionDBC(
      _.sellerUid,
      _.slots,
      _.booked,
      _.serviceDocId,
      _.mandatoryFill,
      _.name,
      _.color,
      _.serviceColor,
      _.start,
      _.end,
      _.id,
      _.status,
      change.after.ref
    )
    const handler = new SessionStatusHandler(session)
    switch (b) {
      case 'potential':
        await handler.potential()
        break
      case 'published':
        await handler.published()
        if ((_.status !== 'full') && (_.slots == _.booked)) {
          await session.update({ status: 'full' })
        }
        break
      case 'full':
        await handler.full()
        break
      case 'active':
        await handler.active()
        break
    }
  })
