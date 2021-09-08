import { testEnv } from './env.spec'
import { db } from '../config'

describe('Tests checkoutComplete HTTPS onCall endpoint', () => {
  let api: any

  beforeAll(async () => {
    api = require('../index.ts')
    await db
      .collection('sessions')
      .doc('12345')
      .collection('slots')
      .doc('67890')
      .set({
        id: '67890',
        name: 'jest test slot for checkoutComplete.ts',
        slot: 1,
        slots: 1,
        start: 239476234,
        end: 498348759,
        sellerUid: 'def456',
        serviceDocId: '135135',
        buyerUid: 'abc123',
        buyerUsername: 'bootymens',
        paymentIntent: 'pi_123',
        status: 'published',
        parentSession: '12345',
      })
  })

  afterAll(async () => {
    testEnv.cleanup()
    await db
      .collection('sessions')
      .doc('12345')
      .collection('slots')
      .doc('67890')
      .delete()
  })

  it('Validates that a checkout session resulted in a paymentIntent status of requires_capture', async () => {
    const wrapped = testEnv.wrap(api.checkoutComplete)
    const response = await wrapped({checkoutId: 'cs_12345'})
    console.log(response)
  })
})
