import { testEnv } from './env.spec'
import { db } from '../config'

describe('Tests publishPotential HTTPS endpoint', () => {
  let api: any

  beforeAll(async () => {
    api = require('../index.ts')
  })

  afterAll(async () => {
    // const srv = await db.collection('services').listDocuments()
    // srv.forEach(doc => doc.delete())
    // const ses = await db.collection('sessions').listDocuments()
    // ses.forEach(doc => doc.delete())
  })

  it('Publishes potential sessions with 1 attendee', async () => {
    await db.collection('services').doc('abc123').set({
      active: true,
      attendees: 1,
      color: '#7c4848',
      id: 'abc123',
      mandatoryFill: false,
      serviceCost: 23,
      serviceDescription: 'testboi by jest',
      serviceLength: 90,
      serviceName: 'jestest',
      seessionDocIdArray: [],
      software: 'npm run test',
      stripePrice: '123abcdefg',
      tags: ['bingus', 'thurston', 'waffles'],
      uid: '123abc'
    })
    .catch(err => console.error(err))
    await db.collection('sessions').doc('12345678').set({
      color: 'grey',
      end: 123456,
      id: '12345678',
      mandatoryFill: false,
      name: 'test-jest',
      sellerUid: '123abc',
      serviceColor: '#7c4848',
      serviceDocId: 'abc123',
      slots: 1,
      start: 12345,
      status: 'potential'
    })
    .catch(err => console.error(err))
    const wrapped = testEnv.wrap(api.publishPotential)
    const response = await wrapped({uid: '123abc'})
    console.log(response)
    expect(response).toBe('ok')
    const published = await db.collection('sessions').where('sellerUid', '==', '123abc').get()
    published.forEach(session => {
      expect(session.data().status).toBe('published')
    })
  })

})