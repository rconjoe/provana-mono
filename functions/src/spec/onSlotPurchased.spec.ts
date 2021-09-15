import { testEnv } from './env.spec'
import { db } from '../config'

describe('Tests onSlotPurchased firestore trigger', () => {
  let api: any

  beforeAll(async() => {
    api = require('../index.ts')
    await db.collection('creators').doc('abc123').set({
      
    })

    await db.collection('sessions').doc('12345').set({
      sellerUid: 'abc123',
      slots: 2,
      booked: 1,
      serviceDocId: '13579',
      mandatoryFill: false,
      name: 'jest test parent session',
      color: 'green',
      serviceColor: 'green',
      start: 1630520984,
      end: 1630521984,
      id: '12345',
      status: 'published'
    })
    await db.collection('chats').doc('12345').set({
      creator: 'abc123',
      users: ['abc123']
    })
  })

  afterAll(async () => {
    testEnv.cleanup()
    await db.collection('sessions').doc('12345').collection('slots').doc('12345678').delete()
    await db.collection('sessions').doc('12345').delete()
    await db.collection('chats').doc('12345').delete()
    await db.collection('tasks').doc('12345678').delete()
    await db.collection('creators').doc('abc123').delete()
  })

  it('sends an email to creator and adds buyer to chat room on slot sold', async () => {
    const bSnap = testEnv.firestore.makeDocumentSnapshot({
      id: '12345678',
      name: 'jest test slot email thing',
      slot: 1,
      slots: 2,
      mandatoryFill: false,
      start: 1630520984,
      end: 1630521984,
      sellerUid: 'abc123',
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
      slots: 2,
      mandatoryFill: false,
      start: 1630520984,
      end: 1630521984,
      sellerUid: 'abc123',
      serviceDocId: '13579',
      buyerUid: '54764576',
      buyerUsername: 'buttington',
      paymentIntent: 'pi_12345',
      status: 'booked',
      parentSession: '12345'
    }, 'sessions/12345/slots/12345678')

    const change = testEnv.makeChange(bSnap, aSnap)
    const wrapped = testEnv.wrap(api.onSlotPurchased)
    const response = await wrapped(change)
    expect(response).toBe('Mail sent,')
    const chat = await db.collection('chats').doc('12345').get()
    expect(chat.exists).toBe(true)
    expect(chat.data()!.users).toContain('54764576')
    const task = await db.collection('tasks').doc('12345678').get()
    expect(task.exists).toBe(true)
    const session = await db.collection('sessions').doc('12345').get()
    expect(session.data()!.status).toBe('full')
    expect(session.data()!.booked).toBe(1)
  })
})
