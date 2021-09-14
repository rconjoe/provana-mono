
/**
 * ChatRoom Class
 * @class ChatRoom
 * @typedef {ChatRoom}
 * @module ChatRoom
 */
export default class ChatRoom {
  users: Array<string> | undefined
  creator: string | undefined

  /**
   * Creates an instance of ChatRoom.
   *
   * @constructor
   * @param {?Array<string>} [users] An array of user objects
   * @param {?string} [creator] the owner of the chatroom
   */
  constructor(
    users?: Array<string>,
    creator?: string,
  ) {
    this.users = users
    this.creator = creator
  }
}
