import { testEnv } from './env.spec'
import { db } from '../config'

describe('Tests confirmCheckoutComplete HTTP onRequest endpoint called by cloud task', () => {
  let api: any

  beforeAll(async () => {
    api = require('../index.ts')
  })

  afterAll(async () => {
    testEnv.cleanup()
  })

  it('', async () => {

  })
})