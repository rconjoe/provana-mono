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
        if ((_.status !== 'full') && (_.slots === _.booked)) {
          return await session.update({ status: 'full' })
        }
        await handler.published()
        break
      case 'full':
        /** 
         * this block is probably redundant/unecessary since 
         * there should be no situation in which before AND after status
         * is full when booked is decremented below slots.
         *
         */
        if ((_.status === 'full') && (_.booked < _.slots)) {
          return await session.update({ status: 'published' })
        }
        await handler.full()
        break
      case 'active':
        await handler.active()
        break
    }
  })
