import { testEnv } from './env.spec'
import { db, stripe } from '../config'

describe('Tests checkout.ts HTTPS endpoint', () => {
  let api: any

  beforeAll(async() => {
    api = require('..index.ts')
  })

  afterAll(async () => {

  })

  it('Generates a stripe checkout session and returns the ID of that session', async () => {
    const wrapped = testEnv.wrap(api.checkout)
    const response = await wrapped({

    })

    expect()
  })
})