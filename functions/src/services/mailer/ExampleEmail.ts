import * as sendGrid from "@sendgrid/mail";
import * as functions from "firebase-functions"

sendGrid.setApiKey(functions.config().sendgrid.key);

const msg = {
    to:"michaelkimcoen@gmail.com",
    from:'noreply@provana.gg',
    //templateId:d-f644bc8af7284c169f1fc8e5535f65e7
    //dynamicTemplateData: {
    //    username: 'rcon joe',
    //    service: 'Test Email',
    //    buyer: 'Some guy writing code',
    //    time: '12:00',
    //    date: '12/12/12'
    //},
    subject: "this is a test email",
    text: "this is a test email body",
    html: "<h1>this is some html in the body</h1><u> just a test</u>"
};

sendGrid.send(msg).then(() => {}, error => {
    console.error(error);

    if(error.response) {
        console.error(error.response.body)
    }
});