import { testEnv } from './env.spec'
import { db } from '../config'

describe('Tests confirmCheckoutComplete HTTP onRequest endpoint called by cloud task', () => {
  let api: any

  beforeAll(async () => {
    api = require('../index.ts')
    await db.collection('sessions').doc('12345')
      .collection('slots').doc('67890').set({
        id: '67890',
        name: 'jest test slot for confirmCheckoutComplete.ts',
        slot: 1,
        slots: 1,
        start: 239476234,
        end: 498348759,
        sellerUid: 'def456',
        serviceDocId: '135135',
        buyerUid: 'abc123',
        buyerUsername: 'buttington',
        paymentIntent: 'pi_12345',
        status: 'holding',
        parentSession: '12345',
      })
  })

  afterAll(async () => {
    testEnv.cleanup()
    await db.collection('sessions').doc('12345')
      .collection('slots').doc('67890').delete()
  })

  it('dry run', async () => {
    const req = { body: '67890' }
    console.log(req)
    const res = {
      sendStatus: (statusCode: number) => {
        console.log(statusCode)
        expect(statusCode).toBe(200)
      }
    }
    await api.confirmCheckoutComplete(req, res)
    const _slot = await db.collection('sessions').doc('12345')
      .collection('slots').doc('67890').get()
    const slot = _slot.data()
    expect(slot!.status).toBe('published')
    expect(slot!.buyerUid).toBeFalsy()
    expect(slot!.buyerUsername).toBeFalsy()
    expect(slot!.paymentIntent).toBeFalsy()
  })
})