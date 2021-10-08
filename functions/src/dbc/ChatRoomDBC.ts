import ChatRoom from '../models/ChatRoom'
import { db } from '../config'
import { addToArray, removeFromArray } from '../util'

// const converter: FirebaseFirestore.FirestoreDataConverter<ChatRoomDBC> = {
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


/**
 * Export for ChatRoomDBC
 *
 * @module ChatRoomDBC
 * @class ChatRoomDBC
 * @typedef {ChatRoomDBC}
 * @extends {ChatRoom}
 * @module ChatRoomDBC
 * @category src
 * @subcategory dbc
 */
export default class ChatRoomDBC extends ChatRoom {
  messages: FirebaseFirestore.CollectionReference | undefined
  ref: FirebaseFirestore.DocumentReference | undefined

  
  /**
   * Creates an instance of ChatRoomDBC.
   *
   * @constructor
   * @param {?Array<string>} [users] Array of Firebase uid's
   * @param {?string} [creator] Creator's Firebase uid
   * @param {?FirebaseFirestore.CollectionReference} [messages] Firebase collection ref for that chatroom
   * @param {?FirebaseFirestore.DocumentReference} [ref] Firebase document ref to the chatroom doc
   */
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
      title: data.title,
      users: []
    })
    await this.addToRoom(data.creator, data.id)
  }

  
  /**
   * Adds a new supporter Firebase uid to the users array on Firestore document, uses addToArray() in config.ts
   *
   * @public
   * @async
   * @param {string} uid
   * @param {string} room
   * @returns {Promise<void>}
   */
  public async addToRoom(uid: string, room: string): Promise<void> {
    await addToArray({
      ref: db.collection('chats').doc(room),
      field: 'users',
      value: uid
    })
  }

  public async removeFromRoom(uid: string, room: string): Promise<void> {
    await removeFromArray({
      ref: db.collection('chats').doc(room),
      field: 'users',
      value: uid
    })
  }

  public async delete(id: string): Promise<void> {
    await db.collection('chats')
      .doc(id)
      .delete()
    .catch(err => {
      console.error(err)
    })
  }
}
