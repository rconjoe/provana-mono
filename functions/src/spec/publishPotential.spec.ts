import { testEnv } from './env.spec'
import { db } from '../config'

jest.setTimeout(3 * 60 * 1000)
describe('Tests publishPotential HTTPS endpoint', () => {
  let api: any

  beforeAll(async () => {
    api = require('../index.ts')
  })

  afterEach(async () => {
    // const srv = await db.collection('services').where('uid', '==', '123abc').get()
    // await srv.docs[0].ref.delete()
    // const ses = await db.collection('sessions').where('sellerUid', '==', '123abc').get()
    // ses.forEach(doc => doc.ref.delete())
  })

  afterAll(() => {
    testEnv.cleanup()
  })

  it('Publishes potential sessions with 1 attendee', async () => {
    await db.collection('services').doc('123').set({
      active: true,
      attendees: 1,
      color: '00d6ff',
      id: '123',
      mandatoryFill: true,
      serviceCost: 25,
      serviceDescription: 'jesty testy',
      serviceLength: 90,
      serviceName: 'jestington testington',
      sessionDocIdArray: ['12345'],
      software: 'onlyfans',
      stripePrice: 'price_12345',
      tags: ['booty', 'cats', 'womp'],
      uid: '123abc'
    })
    await db.collection('sessions').doc('12345').set({
      color: 'grey',
      end: 139476827,
      id: '12345',
      mandatoryFill: true,
      name: 'jestest',
      sellerUid: '123abc',
      serviceColor: '#00d6ff',
      serviceDocId: '123',
      slots: 1,
      start: 1129387455,
      status: 'potential'
    })
    const wrapped = testEnv.wrap(api.publishPotential)
    const response = await wrapped({uid: '123abc'})
    console.log(response)

    const sessionRef = await db.collection('sessions').doc('12345').get()
    const s = sessionRef.data()!
    expect(s.status).toBe('published')
    expect(s.color).toBe('#00d6ff')
  })
  it('Publishes potential session with multiple slots', async () => {
    await db.collection('services').doc('456').set({
      active: true,
      attendees: 5,
      color: '00d6ff',
      id: '456',
      mandatoryFill: true,
      serviceCost: 25,
      serviceDescription: 'jesty testy',
      serviceLength: 90,
      serviceName: 'jestington testington',
      sessionDocIdArray: [],
      software: 'onlyfans',
      stripePrice: 'price_12345',
      tags: ['booty', 'cats', 'womp'],
      uid: '123abc'
  })
    await db.collection('sessions').doc('45678').set({
      color: 'grey',
      end: 139476827,
      id: '45678',
      mandatoryFill: true,
      name: 'jestest',
      sellerUid: '123abc',
      serviceColor: '#00d6ff',
      serviceDocId: '456',
      slots: 5,
      start: 1129387455,
      status: 'potential'
    })

    const wrapped = testEnv.wrap(api.publishPotential)
    const response = await wrapped({uid: '123abc'})
    console.log(response)

    const _parent = await db.collection('sessions').doc('45678').get()
    const parent = _parent.data()!
    expect(parent.status).toBe('published')
    const slots = await db.collection('sessions').doc('45678').collection('slots').get()
    expect(slots.size).toBe(5)
    slots.forEach(slot => {
      expect(slot.data()!.serviceDocId).toBe('456')
    })
  })
})