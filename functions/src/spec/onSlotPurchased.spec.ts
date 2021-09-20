import { testEnv } from './env.spec'
import { db } from '../config'
import * as dayjs from 'dayjs'

describe('Tests slot status watcher for onPurchased functionality', () => {
  let api: any

  beforeAll(async () => {
    api = require('../index.ts')

  })

  afterAll(async () => {
    testEnv.cleanup()
  })

  it('Purchases a non-mandatoryFill session', async () => {
    const now = dayjs().unix()
    const before = testEnv.firestore.makeDocumentSnapshot({
      id: '67890',
      name: 'jest test slot',
      slot: 1,
      slots: 2,
      mandatoryFill: false,
      start: 300 + now,
      end: 7200 + now,
      sellerUid: '123abc',
      serviceDocId: '13371337',
      buyerUid: '456def',
      buyerUsername: 'buttington',
      paymentIntent: 'pi_123',
      status: 'holding',
      parentSession: '12345'
    }, 'sessions/12345/slots/67890')

    const after = testEnv.firestore.makeDocumentSnapshot({
      id: '67890',
      name: 'jest test slot',
      slot: 1,
      slots: 2,
      mandatoryFill: false,
      start: 300 + now,
      end: 7200 + now,
      sellerUid: '123abc',
      serviceDocId: '13371337',
      buyerUid: '456def',
      buyerUsername: 'buttington',
      paymentIntent: 'pi_123',
      status: 'booked',
      parentSession: '12345'
    }, 'sessions/12345/slots/67890')
    const change = testEnv.makeChange(before, after)

    const wrapped = testEnv.wrap(api.onSlotUpdate)
  })

})
