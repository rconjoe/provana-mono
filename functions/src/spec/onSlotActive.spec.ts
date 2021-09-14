import { testEnv } from './env.spec'
import { db } from '../config'

describe('Tests onSlotActive firestore onUpdate trigger', () => {
  let api: any

  beforeAll(async() => {
    api = require('../index.ts')
  })

  afterAll(async () => {
    testEnv.cleanup()
  })

})
