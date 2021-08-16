import { testEnv } from './env.spec'
import { db, auth, stripe } from '../config'

describe('Tests registerSupporter', () => {
  let api: any

  beforeAll(() => {
    api = require('../index.ts')
  })

  afterAll(async () => {
    testEnv.cleanup()
    // Find the doc we just created:
    const cleanupQuery = await db
      .collection('supporters')
      .where('email', '==', 'supporter@jest.com')
      .get()
    const doc = cleanupQuery.docs[0]
    const data = doc.data()
    // Delete the associated customer:
    await stripe.customers.del(data.customer)
    // Delete the associated user:
    await auth.deleteUser(data.uid)
    // Delete the associated document:
    await doc.ref.delete()
  })

  it('should create a new supporter, customer, and db entry', async () => {
    const req = {
      email: 'supporter@jest.com',
      password: 'jestsupporter',
      username: 'jestsupporter'
    }
    const wrapped = testEnv.wrap(api.registerSupporter)
    await wrapped({...req})

    const user = await auth.getUserByEmail(req.email)
    const supporterQuery = await db.collection('supporters')
      .where('email', '==', 'supporter@jest.com')
      .get()
    const data = supporterQuery.docs[0].data()
    const customer = await stripe.customers.retrieve(data.customer)
    expect(supporterQuery.size).toBe(1)
    expect(user.uid).toEqual(data.uid)
    expect(customer.deleted).toBeFalsy()
    expect(customer.id).toMatch(data.customer)
  })
})