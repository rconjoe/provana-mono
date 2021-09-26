import { testEnv } from './env.spec'
import { db } from '../config'

jest.setTimeout(3 * 60 * 1000)
describe('Tests publishPotential HTTPS endpoint', () => {
  let api: any

  beforeAll(async () => {
    api = require('../index.ts')
  })

  afterAll(async () => {
    testEnv.cleanup()
    // await db.collection('sessions').doc('12345').delete()
  })

  it('Sets any potential session to published and update its color', async () => {
    await db.collection('sessions').doc('12345').set({
      sellerUid: '123abc',
      slots: 3,
      booked: 0,
      serviceDocId: '67890',
      mandatoryFill: false,
      name: 'jest-test',
      color: 'grey',
      serviceColor: '#FFC0CB',
      start: 12345678,
      end: 23456789,
      id: '12345',
      status: 'potential'
    })
    const wrapped = testEnv.wrap(api.publishPotential)
    const response = await wrapped({uid: '123abc'})
    console.log(response)
    const q = await db.collection('sessions').where('sellerUid', '==', '123abc').get()
    expect(q.docs[0].data().status).toBe('published')
    expect(q.docs[0].data().color).toBe('#FFC0CB')
  })
})
