import { testEnv } from './env.spec'
import { db } from '../config'

describe('example test block', () => {
  // This is a stupid hack to get typescript to accept our index.ts to use its functions in the test
  // https://github.com/firebase/firebase-functions-test/issues/8
  let api: any
  beforeAll(() => {
    // Part 2 of the aforementioned stupid hack
    api = require('../index.ts')
  })
  // After each test we need to fun cleanup functions and delete the test data from DB
  afterAll(async () => {
    testEnv.cleanup()
    const docs = await db
      .collection('test-messages')
      .listDocuments()
    docs.forEach((doc) => { doc.delete() })
  })

  it('should write test message to the db', async () => {

  // 1. Arrange
    // Build test data.
    const message = 'this is a test message'

    // Use the wrapping method to make the function you're testing callable by jest.
    const wrapped = testEnv.wrap(api.testFunc)

  // 2. Act
    // Call the wrapped function as you normally would.
    await wrapped({message: message})

  // 3. Assert
    // Check db, whatever.
    const q = await db.collection('test-messages').get()
    expect(q.size).toBe(1)
    expect(q.docs[0].data().message!).toMatch(message)

  })



})