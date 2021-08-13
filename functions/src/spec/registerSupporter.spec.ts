import { testEnv } from './env.spec'
import { db, auth, stripe } from '../config'

describe('tests user creation callable in one action', () => {
  let api: any

  beforeAll(() => {
    api = require('../index.ts')
  })

  afterAll(async () => {
    testEnv.cleanup()
    // Find the doc we just created:
    const cleanupQuery = await db
      .collection('supporters')
      .where('email', '==', 'jest@test.com')
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

  it('should create a new user, customer, and db entry', async () => {
    // Mock new user:
    const req = {
      email: 'jest@test.com',
      password: 'jesttest',
      username: 'jesttest'
    }
    const wrapped = testEnv.wrap(api.registerSupporter)
    await wrapped({...req})

    // Check for both auth user and DB entry:
    const user = await auth.getUserByEmail(req.email)
    const q = await db.collection('supporters')
      .where('email', '==', 'jest@test.com')
      .get()
    // DB query should have returned one document:
    expect(q.size).toBe(1)
    const data = q.docs[0].data()
    // The auth user UID should equal the UID we wrote to firestore:
    expect(user.uid).toEqual(data.uid)
    // As should the stripe customer ID:
    const customer = await stripe.customers.retrieve(data.customer)
    expect(customer.deleted).toBeFalsy()
    expect(customer.id).toMatch(data.customer)
  })
})