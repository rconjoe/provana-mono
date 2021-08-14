import { testEnv } from './env.spec'
import { db, auth, stripe } from '../config'

describe('Tests registerCreator', () => {
  let api: any

  beforeAll(() => {
    api = require('../index.ts')
  })

  afterAll(async () => {
    testEnv.cleanup()

    const cleanupQuery = await db.
      collection('creators')
      .where('email', '==', 'jest@test.com')
      .get()
    const doc = cleanupQuery.docs[0]
    const data = doc.data()
    await stripe.customers.del(data.customer)
    await stripe.accounts.del(data.account)
    await auth.deleteUser(data.uid)
    await doc.ref.delete()
  })

  it('should create a new creator, customer, account, and db entry', async () => {
    const req = {
      email: 'jest@test.com',
      password: 'jesttest',
      username: 'jesttest'
    }
    const wrapped = testEnv.wrap(api.registerCreator)
    const response = await wrapped({...req})

    const creatorQuery = await db.collection('creators').where('email', '==', 'jest@test.com').get()
    const data = creatorQuery.docs[0].data()
    const user = await auth.getUserByEmail('jest@test.com')
    const invQuery = await db.collection('invitations').where('uid', '==', user.uid).get()
    const inv = invQuery.docs[0].data()
    const customer = await stripe.customers.retrieve(data.customer)
    const account = await stripe.accounts.retrieve(data.account)

    expect(response).toBe('ok')
    expect(creatorQuery.size).toBe(1)
    expect(user.uid).toEqual(data.uid)
    expect(invQuery.size).toBe(1)
    expect(inv.valid).toBe(false)
    expect(inv.uid).toBe(user.uid)
    expect(customer.id).toBe(data.customer)
    expect(account.id).toBe(data.account)
  })
})