import { db } from '../config'

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
      accType: n.accType,
      category: n.category,
      content: n.content,
      unread: n.unread
    }
  },
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): NotificationDBC {
    const data = snapshot.data()
    return new NotificationDBC(
      data.uid,
      data.accType,
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
  accType: string
  time: number
  category: string
  content: object
  unread: boolean

  
  /**
   * Creates an instance of NotificationDBC.
   *
   * @constructor
   * @param {string} uid The user's Firebase uid
   * @param {string} accType The user's account type either Creator or Supporter
   * @param {number} time Time in unix format that the notificatin was fired
   * @param {string} category Category of the notification
   * @param {object} content Object that contains all the details to be displayed in the notification
   * @param {boolean} unread Boolean that is false as long as the user has not opened the notification
   */
  constructor(
    uid: string,
    accType: string,
    time: number,
    category: string,
    content: object,
    unread: boolean
  ) {
    this.uid = uid
    this.accType = accType
    this.time = time
    this.category = category
    this.content = content
    this.unread = unread
  }

  
  /**
   * Method that sets a new document in the Firestore collection 'notifications' named after the user's Firebase uid
   *
   * @async
   * @returns {Promise<void>}
   */
  async send(): Promise<void> {
    await db.collection('notifications')
      .doc(this.uid)
      .withConverter(converter)
      .set(this)
  }
}