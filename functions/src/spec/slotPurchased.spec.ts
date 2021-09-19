import { testEnv } from './env.spec'
import { db } from '../config'

describe('Tests all events occurring on slot purchase, both mandatoryFill and non', () => {
  let api: any
  beforeAll(async () => {
    api = require('../index.ts')

  })

  afterAll(async () => {
    testEnv.cleanup()
  })

  it('Purchases a non-mandatoryFill session', async () => {
    
  })
})
