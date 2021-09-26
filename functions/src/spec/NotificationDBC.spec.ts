import { testEnv } from "./env.spec";
import { db } from "../config";
import NotificationDBC from "../dbc/NotificationDBC";

describe('Tests the send method of the NotificationDBC', () => {

    afterAll(async () => {
        testEnv.cleanup();
        const q = await db.collection('notifications').doc('123abc').get();
        q.ref.delete();
    })

    it('Creates a new notification in Firestore', async () => {

        const notifDBC = new NotificationDBC('abc123',"jest test",123456,"jest test","this is a jest test notification",true);

        await notifDBC.send();
        const testNotifQuery = await db.collection('notifications').doc("abc123").collection('notif').get();

        const testNotifDocArray = await testNotifQuery.docs;
        const testNotif = testNotifDocArray[0].data();

        expect(testNotif.uid).toBe('abc123');
        expect(testNotif.accType).toBe('jest test');
        expect(testNotif.time).toBe(123456);
        expect(testNotif.category).toBe("jest test");
        expect(testNotif.content).toBe('this is a jest test notification');
        expect(testNotif.unread).toBe(true);
    })
})