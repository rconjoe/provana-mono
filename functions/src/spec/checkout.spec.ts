import { testEnv } from './env.spec'

describe('Tests checkout session generation endpoint', () => {
  let api: any

  beforeAll(async () => {
    api = require('../index.ts')
  })

  afterAll(async () => {
    testEnv.cleanup()
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
  })
})