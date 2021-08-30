import * as functions from 'firebase-functions';
import { GenaricEmail } from '../services/mailer/GenericEmail';

export const sendGenericEmail = functions.https.onCall( async (data, context) => {
    return GenaricEmail(data.emailAddress, data.subject, data.body, data.html, data.templateId, data.dynamicTemplateData);
})