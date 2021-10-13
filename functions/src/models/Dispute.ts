/**
 * Dispute Class
 * @class Dispute
 * @typedef {Dispute}
 * @module Dispute
 * @category src
 * @subcategory models
 */
export default class Dispute {
  slot: string | undefined
  buyer: string | undefined
  comments: Array<string> | undefined
  details: string | undefined
  status: string | undefined
  staffId: string | undefined
  notes: Array<string> | undefined

  /** Creates an instance of Dispute.
   *
   * @constructor
   * @param {?(string | undefined)} [slot] ID of the associated slot
   * @param {?(string | undefined)} [buyer] UID of the disputing party
   * @param {?(Array<string> | undefined)} [comments] String array of comments left by disputing party.
   * @param {?(string | undefined)} [details] Details submitted by buyer in dispute form 
   * @param {?(string | undefined)} [status] Status of the dispute, one of: 'disputed', 'forwarded', 'resolved-refunded', or 'resolved-paid'
   * @param {?(string | undefined)} [staffId] UID of the staff member assigned to the dispute, if any
   * @param {?(Array<string> | undefined)} [notes] A string array of notes left by staff during the resolution process.
   */
  constructor(
  slot?: string | undefined,
  buyer?: string | undefined,
  comments?: Array<string> | undefined,
  details?: string | undefined,
  status?: string | undefined,
  staffId?: string | undefined,
  notes?: Array<string> | undefined
  ) {
    this.slot = slot
    this.buyer = buyer
    this.comments = comments,
    this.details = details
    this.status = status
    this.staffId = staffId
    this.notes = notes
  }
}
