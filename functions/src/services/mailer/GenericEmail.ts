import * as sendGrid from '@sendgrid/mail';
import * as functions from 'firebase-functions';

sendGrid.setApiKey(functions.config().sendgrid.key);

export async function GenaricEmail(
    emailAddress: string, 
    subject?: string, 
    body?: string, 
    html?: string, 
    templateId?: string, 
    dynamicTemplateData?: object) {

        if(templateId != null || templateId != undefined) {
            const msg = {
                to: emailAddress,
                from: 'noreply@provana.gg',
                templateId: templateId,
                dynamicTemplateData: dynamicTemplateData
            }
            sendGrid.send(msg).then( () => {}, error => {
                console.error(error);
                if(error.response) {
                    console.error(error.response.body);
                }
            })
        }
        else {
            const msg = {
                to: emailAddress,
                from: 'noreply@provana.gg',
                subject: subject!,
                text: body!,
                html: html!,
            }
            sendGrid.send(msg).then( () => {}, error => {
                console.error(error);
                if(error.response) {
                    console.error(error.response.body);
                }
            })
        }
} 