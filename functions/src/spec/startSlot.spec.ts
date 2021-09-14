import { testEnv } from './env.spec'
import { db } from '../config'
import nock = require('nock')
import * as dayjs from 'dayjs'

describe('Tests startSlot onRequest Task callback', () => {
  let api: any

  beforeAll(async () => {
    api = require('../index.ts')
    const now = dayjs().unix()
    await db.collection('sessions').doc('12345')
      .collection('slots').doc('67890').set({
        id: '67890',
        name: 'jest test slot',
        slot: 1,
        slots: 3,
        mandatoryFill: false,
        start: 300 + now,
        end: 7200 + now,
        sellerUid: 'abc123',
        serviceDocId: '13371337',
        buyerUid: 'def456',
        buyerUsername: 'jestbuyer',
        paymentIntent: 'pi_12345',
        status: 'booked',
        parentSession: '12345'
      })
  })

  afterAll(async () => {
    testEnv.cleanup()
    await db.collection('sessions').doc('12345')
      .collection('slots').doc('67890')
      .delete()
  })

  it('Receives a slot ID, safety-checks its payment status, and transitions status to active', async () => {
    nock('http://localhost:12113')
      .persist()
      .get('/v1/payment_intents/pi_12345')
      .reply(200, {
        amount: 1099,
        amount_capturable: 0,
        amount_received: 0,
        application: null,
        application_fee_amount: null,
        canceled_at: 1234567890,
        cancellation_reason: null,
        capture_method: 'manual',
        charges: {
          data: [ [Object]  ],
          has_more: false,
          object: 'list',
          url: '/v1/charges?payment_intent=pi_1IyG7RGVpHUbKwE4EvMa09HS'
        },
        client_secret: 'pi_1IyG7RGVpHUbKwE4EvMa09HS_secret_QNBWGwNj7E2h1pyZsKAKZYcs1',
        confirmation_method: 'automatic',
        created: 1234567890,
        currency: 'usd',
        customer: null,
        description: null,
        id: 'pi_1IyG7RGVpHUbKwE4EvMa09HS',
        invoice: null,
        last_payment_error: null,
        livemode: false,
        metadata: {
          slotId: '67890'
        },
        next_action: null,
        object: 'payment_intent',
        on_behalf_of: null,
        payment_method: null,
        payment_method_options: {},
        payment_method_types: [ 'card'  ],
        receipt_email: null,
        review: null,
        setup_future_usage: null,
        shipping: null,
        statement_descriptor: null,
        statement_descriptor_suffix: null,
        /**
         * TOGGLE THIS VALUE TO TEST FUNCTION BEHAVIOR!
         */
        status: 'requires_capture',

        transfer_data: null,
        transfer_group: null
      })
    const req = { body: '67890' }
    const res = {
      sendStatus: (code: number) => {
        expect(code).toBe(200)
      },
    }
    await api.startSlot(req, res)
    const slot = await db.collection('sessions').doc('12345')
      .collection('slots').doc('67890').get()
    expect(slot.data()!.status).toBe('active')
  })
})
