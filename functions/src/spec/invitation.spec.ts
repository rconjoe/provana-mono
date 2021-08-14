import { testEnv } from './env.spec'
import { db } from '../config'

describe('Tests getOrCreateInvitation HTTPS Callable', () => {
  let api: any

  beforeAll(() => {
    api = require('../index.ts')
  })

  afterAll(async () => {
    testEnv.cleanup()
    await db.collection('invitations').doc('123456').delete()
  })

  it('Generates and stores an invitation code from the ID "123456"', async () => {
    const wrapped = testEnv.wrap(api.getOrCreateInvitation)
    await wrapped({discordUserID: '123456'})

    const q = await db.collection('invitations').doc('123456').get()
    expect(q.exists).toBeTruthy()
    expect(q.id).toBe('123456')
  })

  it('Fetches/returns the already existing code', async () => {
    const doc = await db.collection('invitations').doc('123456').get()
    const code = doc.data()!.code!
    const wrapped = testEnv.wrap(api.getOrCreateInvitation)
    const response = await wrapped({discordUserID: '123456'})
    expect(response).toEqual(code)
  })

  it('Validates the existing code', async () => {
    const doc = await db.collection('invitations').doc('123456').get()
    const code = doc.data()!.code

    const wrapped = testEnv.wrap(api.validateInvitation)
    const response = await wrapped({code: code})
    expect(response).toBe(true)
  })
})