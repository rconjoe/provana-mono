import { testEnv } from './env.spec'
import { db } from '../config'

describe('Tests createService endpoint', () => {
  let api: any
  beforeAll(async () => {
    api = require('../index.ts')
  })

  afterAll(async () => {
    testEnv.cleanup()
    const q = await db.collection('services').where('serviceName', '==', 'jesttest').get()
    await q.docs[0].ref.delete()
  })

  it('Creates a new, populated service object in the database', async () => {
    const wrapped = testEnv.wrap(api.createService)
    const testData = {
      serviceName: 'jesttest',
      serviceCost: 23,
      serviceDescription: 'created by jest for test running',
      serviceLength: 60,
      tags: ['booty', 'cats', 'womp'],
      software: 'illustrator',
      attendees: '1',
      mandatoryFill: true,
      color: 'green',
      uid: 'testUser123',
    }
    const response = await wrapped({...testData})
    console.log(response)
    expect(response).toBe('ok')
    const q = await db.collection('services').where('serviceName', '==', 'jesttest').get()
    expect(q.size).toBe(1)
    expect(q.docs[0].data()!.stripePrice).toBeTruthy()
  })

})