import { testEnv } from './env.spec'
import { db } from '../config'

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
      facebook: 'facebook.com/test'
    })
  })

  afterAll(async () => {
    testEnv.cleanup()
    db.collection('creators').doc('13371337').delete()
  })

  it('Set onboarded: true in auth claims if stripe account was successfully onboarded', async () => {
    const wrapped = testEnv.wrap(api.stripeCompleteOnboard)
    const response = await wrapped({uid: '13371337'})
    console.log(response)
    const doc = await db.collection('creators').doc('13371337').get()
    expect(doc.data()!.onboarded).toBe(true)
  })
})