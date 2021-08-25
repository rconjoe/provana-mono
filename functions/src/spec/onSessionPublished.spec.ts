import { testEnv } from './env.spec'
import { db } from '../config'

jest.setTimeout(3 * 60 * 1000)
describe('Tests onSessionPublished firestore trigger endpoint', () => {
  let api: any

  beforeAll(() => {
    api = require('../index.ts')
  })

  afterAll(async () => {
    testEnv.cleanup()
    const slots = await db.collection('sessions').doc('12345').collection('slots').listDocuments()
    slots.forEach(async (doc) => await doc.delete())
    await db.collection('sessions').doc('12345').delete()
  })

  it('Should create the slots under a session when it is published', async () => {
    const before = testEnv.firestore.makeDocumentSnapshot({
      sellerUid: '123abc',
      slots: 5,
      serviceDocId: '67890',
      mandatoryFill: true,
      name: 'jest-test',
      color: 'grey',
      serviceColor: '#FFC0CB',
      start: 12345678,
      end: 23456789,
      id: '12345',
      status: 'potential'
    }, 'sessions/12345')

    const after = testEnv.firestore.makeDocumentSnapshot({
      sellerUid: '123abc',
      slots: 5,
      serviceDocId: '67890',
      mandatoryFill: true,
      name: 'jest-test',
      color: '#FFC0CB',
      serviceColor: '#FFC0CB',
      start: 12345678,
      end: 23456789,
      id: '12345',
      status: 'published'
    }, 'sessions/12345')
    const change = testEnv.makeChange(before, after)

    const wrapped = testEnv.wrap(api.onSessionPublished)
    await wrapped(change).then(async () => {
      const slots = await db.collection('sessions').doc('12345').collection('slots').get()
      expect(slots.size).toBe(5)
      slots.forEach((slot) => {
        expect(slot.data().status).toBe('published')
        expect(slot.data().slot).toBeTruthy()
      })
    })
  })
})