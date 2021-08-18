import { testEnv } from './env.spec';
import { db } from '../config';

describe('Tests ReviewDBC', () => {
    let api: any;

    beforeAll(() => {
        api = require('../index.ts');
    })

    afterEach(async () => {
        testEnv.cleanup();

        const cleanUpQuery = await db.collection('reviews').where('buyerUid', '==','12345').get();
        cleanUpQuery.forEach((doc) => {
            doc.ref.delete();
        })
    })
    it('should create a new review doc in firestore', async () => {
        const date = new Date;
        
        const req = {
            sellerUid:'56789',
            buyerUid: '12345',
            rating: 5,
            message:'this is a jest test message',
            date: date.getDate(),
            serviceName: 'jest test service'
        }
        const wrapped = testEnv.wrap(api.writeNewReview);
        await wrapped({...req});

        const firebaseQuery = await db.collection('reviews').where('buyerUid','==','12345').get();
        const data = firebaseQuery.docs[0].data();
        expect(firebaseQuery.size).toBe(1);
        expect(data.buyerUid).toBe('12345');
        expect(data.sellerUid).toBe('56789');
        expect(data.rating).toBe(5);
        expect(data.message).toBe('this is a jest test message');
        expect(data.date).toBe(date.getDate());
        expect(data.serviceName).toBe('jest test service');
    })
})