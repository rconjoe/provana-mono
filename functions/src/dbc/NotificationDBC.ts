import { db } from '../config'
import TimeService from '../services/TimeService'

/**
 * Converter for either mapping data to a Firestore document snapshot or from Firestore to a NotificationDBC object
 * 
 * @returns {{ toFirestore(invitation: InvitationDBC): any; fromFirestore(snapshot: any): InvitationDBC; }}
 */
const converter = {
  toFirestore(n: NotificationDBC): FirebaseFirestore.DocumentData {
    return {
      uid: n.uid,
      time: n.time,
      category: n.category,
      content: n.content,
      unread: n.unread
    }
  },
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): NotificationDBC {
    const data = snapshot.data()
    return new NotificationDBC(
      data.uid,
      data.time,
      data.category,
      data.content,
      data.unread
    )
  }
}


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
  time?: number
  category: string
  content: string
  unread: boolean

  
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
    unread: boolean,
    time?: number
  ) {
    this.uid = uid
    this.time = time
    this.category = category
    this.content = content
    this.unread = unread
  }

  
  /**
   * Method that sets a new document in the Firestore collection 'notifications' named after the user's Firebase uid and then into a sub collection inside that doc named "notif"
   *
   * @async
   * @returns {Promise<void>}
   */
  async send(): Promise<void> {
    this.time = new TimeService().generate();
    await db.collection('notifications')
      .doc(this.uid)
      .collection('notif')
      .doc(this.uid)
      .withConverter(converter)
    .set(this)
  }
}
