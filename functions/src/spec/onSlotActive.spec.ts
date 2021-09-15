import { testEnv } from './env.spec'
import { db } from '../config'
import * as dayjs from 'dayjs'

describe('Tests onSlotActive firestore onUpdate trigger', () => {
  let api: any

  beforeAll(async() => {
    api = require('../index.ts')
  })

  afterAll(async () => {
    testEnv.cleanup()
    await db.collection('tasks').doc('67890').delete()
  })
  
  it('Schedules capture task on slot active', async () => {
    const now = dayjs().unix()
    const b = testEnv.firestore.makeDocumentSnapshot({
      id: '67890',
      name: 'jest test slot email thing',
      slot: 1,
      slots: 2,
      mandatoryFill: false,
      start: now,
      end: 7200 + now,
      sellerUid: 'abc123',
      serviceDocId: '13579',
      buyerUid: '54764576',
      buyerUsername: 'buttington',
      paymentIntent: 'pi_12345',
      status: 'booked',
      parentSession: '12345'
    }, 'sessions/12345/slots/67890')
    const a = testEnv.firestore.makeDocumentSnapshot({
      id: '67890',
      name: 'jest test slot email thing',
      slot: 1,
      slots: 2,
      mandatoryFill: false,
      start: now,
      end: 7200 + now,
      sellerUid: 'abc123',
      serviceDocId: '13579',
      buyerUid: '54764576',
      buyerUsername: 'buttington',
      paymentIntent: 'pi_12345',
      status: 'active',
      parentSession: '12345'
    }, 'sessions/12345/slots/67890')
    const change = testEnv.makeChange(b, a)
    const wrapped = testEnv.wrap(api.onSlotActive)
    await wrapped(change)
    const task = await db.collection('tasks').doc('67890').get()
    expect(task.exists).toBe(true)
    expect(task.data()!.path).toBeTruthy()

  })
})
