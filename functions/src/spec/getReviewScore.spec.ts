import { testEnv } from './env.spec'
import { db } from '../config'
import * as dayjs from 'dayjs'
jest.setTimeout(3 * 60 * 1000)

describe('Tests getReviewScore', () => {
    let api: any;

    beforeAll( async () => {
        api = require('../index.ts');
        for(let i =0; i<3; i++) {
            await db.collection('reviews').doc().set({
                sellerUid:'56789',
                buyerUid: i,
                rating: 5,
                message:'this is a jest test message',
                date: dayjs().unix(),
                serviceName: `test review #${i}`
            });
        };
        for(let i =0; i<2; i++) {
            await db.collection('reviews').doc().set({
                sellerUid:'56789',
                buyerUid: i,
                rating: 1,
                message:'this is a jest test message',
                date: dayjs().unix(),
                serviceName: `test review #${i}`
            });
        };
    })


    afterEach(async () => {
        testEnv.cleanup();
        const cleanUpQuery = await db.collection('reviews').where('sellerUid', '==','56789').get();

        cleanUpQuery.forEach((doc) => {
            doc.ref.delete();
        })
    })


    it('should be able to take the reviews in the db and average out the ratings', async () => {
        const wrapped = testEnv.wrap(api.getReviewScore);
        const response = await wrapped({sellerUid: '56789'});
        expect(response).toBe(3.4)
    })
})