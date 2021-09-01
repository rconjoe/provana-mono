import { db } from '../config'

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

export default class NotificationDBC {
  uid: string
  accType: string
  time: number
  category: string
  content: object
  unread: boolean

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

  async send(): Promise<void> {
    await db.collection('notifications')
      .doc(this.uid)
      .withConverter(converter)
      .set(this)
  }
}