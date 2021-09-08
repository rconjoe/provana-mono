export default class ChatRoom {
  users: Array<string> | undefined
  creator: string | undefined

  constructor(
    users?: Array<string>,
    creator?: string,
  ) {
    this.users = users
    this.creator = creator
  }
}
