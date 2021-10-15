export default class DiscordLink {
  code: string | undefined
  uid: string | undefined
  type: string | undefined
  
  constructor(code?: string, uid?: string, type?: string) {
    this.code = code
    this.uid = uid
    this.type = type
  }

  public generate(): string {
    const code = []
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const len = characters.length
    for (let i=0; i<16; i++) {
      code.push(characters.charAt(Math.floor(Math.random() * len)))
    }
    return code.join('')
  }
}
