import { testEnv } from './env.spec'
import { db } from '../config'

describe('Tests checkout session generation endpoint', () => {
  let api: any

  beforeAll(async () => {
    api: require('../index.ts')
  })

  afterAll(async () => {
    testEnv.cleanup()
  })

  it('Returns a checkout session ID', async () => {
  })
})