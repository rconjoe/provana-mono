import { testEnv } from './env.spec'
import { db } from '../config'
const ref = db.collection('sessions').doc('12345').collection('slots').doc('12345678')

describe('Tests onSlotPurchased firestore trigger', () => {
  let api: any

  beforeAll(async() => {
    api = require('../index.ts')
  })

  afterAll(async () => {
    testEnv.cleanup()
    await ref.delete()
  })

  it('sends and email on slot sold', async () => {
    const bSnap = testEnv.firestore.makeDocumentSnapshot({
      id: '12345678',
      name: 'jest test slot email thing',
      slot: 1,
      slots: 1,
      start: 1630520984,
      end: 1630520984,
      sellerUid: 'dclKIs51l3dlJfULDlzcoDYkV7i2',
      serviceDocId: '78934587',
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
      end: 1630520984,
      sellerUid: 'dclKIs51l3dlJfULDlzcoDYkV7i2',
      serviceDocId: '78934587',
      buyerUid: '54764576',
      buyerUsername: 'buttington',
      paymentIntent: 'pi_12345',
      status: 'purchased',
      parentSession: '12345'
    }, 'sessions/12345/slots/12345678')

    const change = testEnv.makeChange(bSnap, aSnap)
    const wrapped = testEnv.wrap(api.onSlotPurchased)
    await wrapped(change).then((response: any) => {
      console.log(response)
    })
  })
})