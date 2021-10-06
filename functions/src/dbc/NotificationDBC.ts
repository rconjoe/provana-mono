import { db } from '../config'
import TimeService from '../services/TimeService'

/**
 * Export for the NotificationDBC class
 * 
 * @class NotificationDBC
 * @typedef {NotificationDBC}
 * @module NotificationDBC
 * @category src
 * @subcategory dbc
 */
export default class NotificationDBC {
  uid: string
  category: string
  content: string
  unread: boolean | undefined
  time?: number | undefined

  
  /**
   * Creates an instance of NotificationDBC.
   *
   * @constructor
   * @param {string} uid The user's Firebase uid
   * @param {number} time Time in unix format that the notificatin was fired
   * @param {string} category Category of the notification
   * @param {string} content String of the notifcation text 
   * @param {boolean} unread Boolean that is false as long as the user has not opened the notification
   */
  constructor(
    uid: string,
    category: string,
    content: string,
  ) {
    this.uid = uid
    this.category = category
    this.content = content
    this.time = new TimeService().generate()
  }

  
  /**
   * Method that sets a new document in the Firestore collection 'notifications' named after the user's Firebase uid and then into a sub collection inside that doc named "notif"
   *
   * @async
   * @returns {Promise<void>}
   */
  async send(): Promise<void> {
    this.unread = true
    await db.collection('notifications')
      .doc(this.uid)
      .collection('notif')
    .add({...this})
    .catch(err => {
      throw new Error(err)
    })
  }
}
