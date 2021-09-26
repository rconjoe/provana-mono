import { testEnv } from './env.spec'
import { db  } from '../config'

jest.setTimeout(3 * 60 * 1000)
describe('Triggers status changes on a test session document to test trigger endpoint cases', () => {
  let api: any

  beforeAll(() => {
    api = require('../index.ts')

  })

  afterAll(async () => {
    testEnv.cleanup()
    const slots = await db.collection('sessions').doc('12345').collection('slots').listDocuments()
    slots.forEach(async (doc) => await doc.delete())
    await db.collection('sessions').doc('12345').delete()
    await db.collection('chats').doc('12345').delete()

  })

  it('potential -> published', async () => {
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
    const wrapped = testEnv.wrap(api.onSessionUpdate)

    await wrapped(change).then(async () => {
      // slots
      const slots = await db.collection('sessions').doc('12345').collection('slots').get()
      expect(slots.size).toBe(5)
      slots.forEach((slot) => {
        expect(slot.data().status).toBe('published')
        expect(slot.data().slot).toBeTruthy()
      })
      // chat 
      const room = await db.collection('chats').doc('12345').get()
      expect(room.exists).toBe(true)
      expect(room.data()!.users).toContain('123abc')
      expect(room.data()!.creator).toBe('123abc')
      expect(room.data()!.title).toBe('jest-test')
    })
  })
})
