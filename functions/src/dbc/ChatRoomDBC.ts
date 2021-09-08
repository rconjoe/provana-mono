import ChatRoom from '../models/ChatRoom'
import { db, addToArray } from '../config'

// const converter: FirebaseFirestore.FirestoreDataConverter = {
//   toFirestore(r: ChatRoomDBC): FirebaseFirestore.DocumentData {
//     return {
//       users: r.users ? r.users : [],
//       creator: r.creator ? r.creator : "",
//       messages: r.messages ? r.messages : FirebaseFirestore.CollectionReference
//     }
//   },
//   fromFirestore(snap: FirebaseFirestore.QueryDocumentSnapshot): ChatRoomDBC {
//     const data = snap.data()
//     return new ChatRoomDBC(
//       data.users,
//       data.creator,
//       snap.ref.collection('messages'),
//       snap.ref
//     )
//   }
// }

export default class ChatRoomDBC extends ChatRoom {
  messages: FirebaseFirestore.CollectionReference | undefined
  ref: FirebaseFirestore.DocumentReference | undefined

  constructor(
    users?: Array<string>,
    creator?: string,
    messages?: FirebaseFirestore.CollectionReference,
    ref?: FirebaseFirestore.DocumentReference
  ) {
    super(users, creator)
    this.messages = messages
    this.ref = ref
  }

  public async initialize(data: {
    id: string,
    creator: string,
    title: string
  }): Promise<void> {
    this.ref = db
      .collection('chats')
      .doc(data.id)
    await this.ref.set({
      creator: data.creator,
      title: data.title
    })
    await addToArray({
      ref: this.ref,
      field: 'users',
      value: data.creator
    })
  }
}
