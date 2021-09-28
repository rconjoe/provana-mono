
/**
 * Invintation Class
 * @class Invitation
 * @typedef {Invitation}
 * @module Invintation
 * @category src
 * @subcategory models
 */
export default class Invitation {

  id: string | undefined
  code: string | undefined
  generated: number | undefined
  valid: boolean | undefined
  uid: string | undefined

  
  /**
   * Creates an instance of Invitation.
   *
   * @constructor
   * @param {?(string | undefined)} [id] Firebase Document Id
   * @param {?(string | undefined)} [code] Code generated by the discord invintation bot
   * @param {?(number | undefined)} [generated] Time that the code was generated
   * @param {?(boolean | undefined)} [valid] Boolean if the code is a valid code or not
   * @param {?(string | undefined)} [uid] The user's firebase UID
   */
  constructor(
  id?: string | undefined,
  code?: string | undefined,
  generated?: number | undefined,
  valid?: boolean | undefined,
  uid?: string | undefined,
  ) {
    this.id = id,
    this.code = code,
    this.generated = generated,
    this.valid = valid,
    this.uid = uid
  }

}
