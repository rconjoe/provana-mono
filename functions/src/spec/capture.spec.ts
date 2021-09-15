import { testEnv } from './env.spec'
import { db } from '../config'
import nock = require('nock')

describe('Tests capture HTTP onRequest endpoint', () => {
  let api: any
  beforeAll(async () => {
    api = require('../index.ts')

  })

  afterAll(async () => {
    testEnv.cleanup()

  })

  it('Captures a paymentIntent and completes a slot/session lifecycle', async () => {
    
  })
})
