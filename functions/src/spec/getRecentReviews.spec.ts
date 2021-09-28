import { testEnv } from './env.spec'
import { db } from '../config'
import * as dayjs from 'dayjs'
jest.setTimeout(3 * 60 * 1000)

describe('Tests getRecentReviews', () => {
  let api: any

  beforeAll( async () => {
    api = require('../index.ts')
    for(let i=0; i<5; i++) {
      await db.collection('reviews').doc().set({
        sellerUid:'56789',
        buyerUid: i,
        rating: 5,
        message :'this is a jest test message',
        date: dayjs().unix(),
        serviceName: `test review #${i}`
      })
    }
  })

  afterEach(async () => {
    testEnv.cleanup()
    const cleanUpQuery = await db.collection('reviews').where('sellerUid', '==', '56789').get()
    cleanUpQuery.forEach((doc) => {
        doc.ref.delete()
    })
  })


  it('should be able to get the last 20 most recent reviews',async () => {
    const wrapped = testEnv.wrap(api.getRecentReviews)
    const response = await wrapped({sellerUid: '56789'})
    expect(response.length).toBe(5)
    expect(response[0].message).toBe('this is a jest test message')
  })
})
