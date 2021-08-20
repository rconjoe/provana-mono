import { testEnv } from './env.spec'
import { db, auth, stripe } from '../config'

jest.setTimeout(3 * 60 * 1000)
describe('Tests registerCreator', () => {
  let api: any

  beforeAll(async () => {
    api = require('../index.ts')
    await db.collection('invitations').doc('13371337').set({
      id: '13371337',
      code: '123abc',
      generated: '12345678',
      valid: true,
      uid: ''
    })
  })

  afterAll(async () => {
    testEnv.cleanup()

    const cleanupQuery = await db.
      collection('creators')
      .where('email', '==', 'creator@jest.com')
      .get()
    const doc = cleanupQuery.docs[0]
    const data = doc.data()
    await stripe.customers.del(data.customer)
    await stripe.accounts.del(data.account)
    await auth.deleteUser(data.uid)
    await doc.ref.delete()
    await db.collection('invitations').doc('13371337').delete()
  })

  it('should create a new creator, customer, account, and db entry', async () => {
    const req = {
      email: 'creator@jest.com',
      password: 'jestcreator',
      code: '123abc',
      username: 'jestcreator'
    }
    const wrapped = testEnv.wrap(api.registerCreator)

    const response = await wrapped({...req})
    expect(response).toBe('ok')

    const creatorQuery = await db.collection('creators').where('email', '==', 'creator@jest.com').get()
    expect(creatorQuery.size).toBe(1)
    expect(creatorQuery.docs[0].data()!.onboarded).toBe(false)

    const data = creatorQuery.docs[0].data()
    const user = await auth.getUserByEmail('creator@jest.com')
    expect(user.uid).toEqual(data.uid)
    expect(user.customClaims!.type).toBe('creators')

    const invQuery = await db.collection('invitations').where('uid', '==', user.uid).get()
    const inv = invQuery.docs[0].data()
    expect(invQuery.size).toBe(1)
    expect(inv.valid).toBe(false)
    expect(inv.uid).toBe(user.uid)

    const customer = await stripe.customers.retrieve(data.customer)
    expect(customer.id).toBe(data.customer)

    const account = await stripe.accounts.retrieve(data.account)
    expect(account.id).toBe(data.account)
  })
})