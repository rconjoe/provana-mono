import { testEnv } from './env.spec';
import { db } from '../config';

describe('Tests ReviewDBC', () => {
    let api: any;

    beforeAll( async () => {
        api = require('../index.ts');
        await addFiveReviews();
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
            sellerUid:'567890',
            buyerUid: '12345',
            rating: 5,
            message:'this is a jest test message',
            date: date.getDate(),
            serviceName: 'jest test service'
        }
        const wrapped = testEnv.wrap(api.writeNewReview);
        await wrapped({...req});

        const firebaseQuery = await db.collection('reviews').where('sellerUid','==','567890').get();
        const data = firebaseQuery.docs[0].data();
        expect(firebaseQuery.size).toBe(1);
        expect(data.buyerUid).toBe('12345');
        expect(data.sellerUid).toBe('567890');
        expect(data.rating).toBe(5);
        expect(data.message).toBe('this is a jest test message');
        expect(data.date).toBe(date.getDate());
        expect(data.serviceName).toBe('jest test service');
    })

    it('should be able to get the last 20 most recent reviews',async () => {

        const req = {
            sellerUid:'56789'
        }
        
        const wrapped = testEnv.wrap(api.getRecentReviews);
        let data = 'null';
        await wrapped({...req}).then((res: any) => {
            data = res;
        });

        const arrayLength = data.length

        expect(arrayLength).toBe(5);
    })
})


async function addFiveReviews() {

    const date = new Date
        let i = 0;

        while(i < 5 ) {
            db.collection('reviews').doc().create({
                sellerUid:'56789',
                buyerUid: '12345',
                rating: 5,
                message:'this is a jest test message',
                date: date.getDate(),
                serviceName: 'jest test service'
            })
            i++
        }
}