import * as sendGrid from "@sendgrid/mail";
import * as functions from "firebase-functions";
import { db } from '../../config';

sendGrid.setApiKey(functions.config().sendgrid.key);

export async function sendSessionSoldEmail(sellerUsername: string, buyerUsername: string, dateTime: Date, serviceDocRef: string, sellerUid: string) {

    const serviceDoc = await db.collection('services').doc(serviceDocRef).get();
    const serviceData = serviceDoc.data();
    const serviceName = serviceData!.serviceName;
    
    const sellerDocRef = await db.collection('creators').doc(sellerUid).get();
    const sellerData = sellerDocRef.data();
    const sellerEmail = sellerData!.email;

    const msg = {
        to: sellerEmail,
        from: 'noreply@provana.gg',
        templateId: 'd-f644bc8af7284c169f1fc8e5535f65e7',
        dynamicTempateData: {
            username: sellerUsername,
            service: serviceName,
            buyer: buyerUsername,
            time: dateTime.getTime(),
            date: dateTime.getDate()
        }
    }

    sendGrid.send(msg).then(() => {}, error => {
        console.error(error);

        if(error.response) {
            console.error(error.response.body);
        }
    })
    return "email sent";
}