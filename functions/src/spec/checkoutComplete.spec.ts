import { testEnv } from './env.spec'
import { db } from '../config'
import nock = require('nock')

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
        status: 'holding',
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
  nock('http://localhost:12113')
    .persist()
    .get('/v1/accounts/')
    .reply(200, {
      business_profile: {
        mcc: null,
        name: null,
        product_description: null,
        support_address: null,
        support_email: null,
        support_phone: null,
        support_url: null,
        url: null
      },
      business_type: null,
      capabilities: { card_payments: 'active', transfers: 'active'  },
      charges_enabled: false,
      controller: { type: 'account'  },
      country: 'US',
      created: 1234567890,
      default_currency: 'usd',
      details_submitted: true,
      email: 'site@stripe.com',
      external_accounts: {
        data: [ [Object]  ],
        has_more: false,
        object: 'list',
        url: '/v1/accounts/acct_1J3vLj2eEzjDrkTw/external_accounts'
      },
      id: 'acct_1J3vLj2eEzjDrkTw',
      metadata: {},
      object: 'account',
      payouts_enabled: false,
      requirements: {
        current_deadline: null,
        currently_due: [
          'business_profile.product_description',
          'business_profile.support_phone',
          'business_profile.url',
          'external_account',
          'tos_acceptance.date',
          'tos_acceptance.ip'
        ],
        disabled_reason: 'requirements.past_due',
        errors: [],
        eventually_due: [
          'business_profile.product_description',
          'business_profile.support_phone',
          'business_profile.url',
          'external_account',
          'tos_acceptance.date',
          'tos_acceptance.ip'
        ],
        past_due: [],
        pending_verification: []
      },
      settings: {
        bacs_debit_payments: {},
        branding: {
          icon: null,
          logo: null,
          primary_color: null,
          secondary_color: null
        },
        card_issuing: { tos_acceptance: [Object]  },
        card_payments: { decline_on: [Object], statement_descriptor_prefix: null  },
        dashboard: { display_name: null, timezone: 'Etc/UTC'  },
        payments: {
          statement_descriptor: null,
          statement_descriptor_kana: null,
          statement_descriptor_kanji: null
        },
        payouts: {
          debit_negative_balances: true,
          schedule: [Object],
          statement_descriptor: null
        },
        sepa_debit_payments: {}
      },
      tos_acceptance: { date: null, ip: null, user_agent: null  },
      type: 'standard'
    })

  nock('http://localhost:12113')
    .persist()
    .get('/v1/checkout/sessions/cs_12345')
    .reply(200, {
      amount_subtotal: null,
      amount_total: null,
      automatic_tax: { enabled: false, status: null  },
      billing_address_collection: null,
      cancel_url: 'https://example.com/cancel',
      client_reference_id: null,
      currency: null,
      customer: null,
      customer_details: null,
      customer_email: null,
      id: 'cs_123',
      livemode: false,
      locale: null,
      metadata: {},
      mode: 'payment',
      object: 'checkout.session',
      payment_intent: 'pi_123',
      payment_method_options: {},
      payment_method_types: [ 'card'  ],
      payment_status: 'unpaid',
      setup_intent: null,
      shipping: null,
      shipping_address_collection: null,
      submit_type: null,
      subscription: null,
      success_url: 'https://example.com/success',
      total_details: null,
      url: null
    })

  nock('http://localhost:12113')
  .persist()
  .get('/v1/payment_intents/pi_123')
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
    client_secret: 'pi_123_secret_QNBWGwNj7E2h1pyZsKAKZYcs1',
    confirmation_method: 'automatic',
    created: 1234567890,
    currency: 'usd',
    customer: null,
    description: null,
    id: 'pi_123',
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
    status: 'requires_capture',
    transfer_data: null,
    transfer_group: null
  })
    const wrapped = testEnv.wrap(api.checkoutComplete)
    const response = await wrapped({checkoutId: 'cs_12345'})
    console.log(response)
    expect(response).toBe('booked')
    const slot = await db.collection('sessions').doc('12345')
      .collection('slots').doc('67890')
      .get()
    expect(slot.exists).toBe(true)
    expect(slot.data()!.status).toBe('booked')
    expect(slot.data()!.buyerUid).toBe('abc123')
  })
})
