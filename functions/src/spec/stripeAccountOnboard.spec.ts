import { testEnv } from './env.spec'
import { db, auth } from '../admin'
import { stripe } from '../config/config'

describe('Generates an account link for a non-onboarded creator account', () => {
  let api: any

  beforeAll(async () => {
    api = require('../index.ts')
    await db.collection('invitations').doc('123456').set({
      id: '123456',
      code: '1234abcd',
      generated: '12345678',
      valid: true,
      uid: '',
    })
  })

  afterAll(async () => {
    testEnv.cleanup()
    const user = await auth.getUserByEmail('onboardLinkTest@jest.com')
    await auth.deleteUser(user.uid)
    const doc = await db.collection('creators').doc(user.uid).get()
    await stripe.customers.del(doc.data()!.customer)
    await stripe.accounts.del(doc.data()!.account)
    await doc.ref.delete()
    await db.collection('invitations').doc('123456').delete()
  })

  it('Returns an account link the the specified stripe account ID', async () => {
    const registerCreator = testEnv.wrap(api.registerCreator)
    await registerCreator({
      email: 'onboardLinkTest@jest.com',
      password: 'onboardLinkTest',
      code: '1234abcd',
      displayName: 'onboardLinkTestCreator',
    })
    const user = await auth.getUserByEmail('onboardLinkTest@jest.com')
    const wrapped = testEnv.wrap(api.stripeAccountOnboard)
    const response = await wrapped({uid: user.uid})
    expect(response.object).toBe('account_link')
    expect(response.url).toContain('https://richardm-manage-mydev.dev.stripe.me/setup/s/')
  })
})
