import { testEnv } from './env.spec'
import { db } from '../admin'

describe('Tests checkout session generation endpoint', () => {
  let api: any

  beforeAll(async () => {
    api = require('../index.ts')
    await db.collection('sessions')
      .doc('12345')
      .collection('slots')
      .doc('67890')
      .set({
        id: '67890',
        name: 'jest test slot for checkout.ts',
        slot: 1,
        slots: 1,
        start: 239476234,
        end: 498348759,
        sellerUid: 'def456',
        serviceDocId: '135135',
        buyerUid: '',
        buyerUsername: '',
        paymentIntent: '',
        status: 'published',
        parentSession: '12345',
      })
  })

  afterAll(async () => {
    testEnv.cleanup()
    await db.collection('sessions').doc('12345')
      .collection('slots').doc('67890').delete()
  })

  it('Returns a checkout session ID', async () => {
    const wrapped = testEnv.wrap(api.checkout)
    const response = await wrapped({
      uid: 'abc123',
      username: 'jestbuyer',
      customer: 'cus_123',
      account: 'acc_123',
      price: 'price_123',
      serviceCost: 50,
      slotId: '67890',
      sessionId: '12345'
    })
    console.log(response)
    expect(response).toBeTruthy()
    const _slot = await db.collection('sessions').doc('12345')
      .collection('slots').doc('67890').get()
    const slot = _slot.data()!
    // console.log(slot)
    expect(slot.status).toBe('holding')
    expect(slot.paymentIntent).toBeTruthy()
    expect(slot.buyerUid).toBe('abc123')
    expect(slot.buyerUsername).toBe('jestbuyer')
  })
})
