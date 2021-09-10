import { testEnv } from './env.spec'
import { db } from '../config'
import nock = require('nock')

describe('Tests endpoint stripeCompleteOnboard', () => {
  let api: any
  beforeAll(async () => {
    api = require('../index.ts')
    await db.collection('creators').doc('13371337').set({
      uid: '13371337',
      customer: 'test12345',
      account: 'acct_1J3vLj2eEzjDrkTw',
      email: 'completeOnboardTest@jest.com',
      username: 'completeOnboardTest',
      timezone: 'bootyland',
      avatar: 'http://placekitten.com/300/300',
      banner: 'http://placekitten.com/800/200',
      twitter: 'twitter.com/test',
      twitch: 'twitch.com/test',
      youtube: 'youtube.com/test',
      facebook: 'facebook.com/test',
      onboarded: false
    })
  })

  afterAll(async () => {
    testEnv.cleanup()
    db.collection('creators').doc('13371337').delete()
  })

  it('Set onboarded: true in auth claims if stripe account was successfully onboarded', async () => {
    nock('http://localhost:12113')
      .persist()
      .get('/v1/accounts/acct_1J3vLj2eEzjDrkTw')
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
        // this fucking line
        details_submitted: true,
        //
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
    const wrapped = testEnv.wrap(api.stripeCompleteOnboard)
    const response = await wrapped({uid: '13371337'})
    console.log(response)
    const doc = await db.collection('creators').doc('13371337').get()
    expect(doc.data()!.onboarded).toBe(true)
  })
})
