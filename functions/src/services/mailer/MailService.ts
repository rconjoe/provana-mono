import { sg } from '../../config'


/**
 * Export for the MailService class
 *
 * @class MailService
 * @typedef {MailService}
 * @module MailService
 * @category src
 * @subcategory services/mailer
 */
export default class MailService {
  email: string

  
  /**
   * Creates an instance of MailService.
   * @date 9/16/2021 - 3:59:21 PM
   *
   * @constructor
   * @param {string} email email address of the user you want to send an email to
   */
  constructor(email: string) {
    this.email = email
  }

  
  /**
   * Takes an object that matches the SlotsSold interface and fills the email template found on the SendGrid account and sends the email to that email address
   *
   * @public
   * @async
   * @param {SlotSold} data
   * @returns {Promise<string>}
   */
  public async slotSold(data: SlotSold): Promise<string> {
    const response = await sg.send({
      to: this.email,
      from: 'noreply@provana.gg',
      templateId: 'd-f644bc8af7284c169f1fc8e5535f65e7',
      dynamicTemplateData: {...data}
    })
    if (response[0].statusCode === 202) return 'Mail sent,'
    else throw new Error(`${response[0].statusCode}: ${response[0].body}`)
  }
}


/**
 * Interface that contains all the data needed to fill out the SendGrid template
 *
 * @interface SlotSold
 * @typedef {SlotSold}
 * @category src
 * @subcategory services/mailer
 */
interface SlotSold {
  username: string,
  service: string,
  buyer: string,
  time: string,
  date: string
}