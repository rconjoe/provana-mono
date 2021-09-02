import { testEnv } from './env.spec'
import { db } from '../config'

describe('Tests onSlotPurchased firestore trigger', () => {
  let api: any

  beforeAll(async() => {
    api = require('../index.ts')
    await db.collection('sessions').doc('12345').set({
      sellerUid: 'dclKIs51l3dlJfULDlzcoDYkV7i2',
      slots: 1,
      serviceDocId: '13579',
      mandatoryFill: true,
      name: 'jest test parent session',
      color: 'green',
      serviceColor: 'green',
      start: 1630520984,
      end: 1630521984,
      id: '12345',
      status: 'published'
    })
  })

  afterAll(async () => {
    testEnv.cleanup()
    await db.collection('sessions').doc('12345').collection('slots').doc('12345678').delete()
  })

/**
 * This test will always pass. You'll need to set your UID below and make sure your email
 * is set to an account you can check in the database.
 * (Don't worry changing the DB email won't affect your login. That comes from Auth API elsewhere.)
 */
  it('sends and email on slot sold', async () => {
    const bSnap = testEnv.firestore.makeDocumentSnapshot({
      id: '12345678',
      name: 'jest test slot email thing',
      slot: 1,
      slots: 1,
      start: 1630520984,
      end: 1630521984,
      sellerUid: 'dclKIs51l3dlJfULDlzcoDYkV7i2',
      serviceDocId: '13579',
      buyerUid: '54764576',
      buyerUsername: 'buttington',
      paymentIntent: 'pi_12345',
      status: 'holding',
      parentSession: '12345'
    }, 'sessions/12345/slots/12345678')
    const aSnap = testEnv.firestore.makeDocumentSnapshot({
      id: '12345678',
      name: 'jest test slot email thing',
      slot: 1,
      slots: 1,
      start: 1630520984,
      end: 1630521984,
      sellerUid: 'dclKIs51l3dlJfULDlzcoDYkV7i2',
      serviceDocId: '13579',
      buyerUid: '54764576',
      buyerUsername: 'buttington',
      paymentIntent: 'pi_12345',
      status: 'purchased',
      parentSession: '12345'
    }, 'sessions/12345/slots/12345678')

    const change = testEnv.makeChange(bSnap, aSnap)
    const wrapped = testEnv.wrap(api.onSlotPurchased)
    const response = await wrapped(change)
    expect(response).toBe('Mail sent,')
  })
})