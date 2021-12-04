
/**
 * Exports the class Session
 *
 * @class Session
 * @typedef {Session}
 * @module Session
 * @category src
 * @subcategory models
 */
export default class Session {
  sellerUid: string | undefined
  slots: number | undefined
  booked: number | undefined
  serviceDocId: string | undefined
  mandatoryFill: boolean | undefined
  name: string | undefined
  color: string | undefined
  serviceColor: string | undefined
  start: number | undefined
  end: number | undefined
  id: string | undefined
  status: string | undefined

  
  /**
   * Creates an instance of Session.
   *
   * @constructor
   * @param {?string} [sellerUid] Firebase UID of the Creator
   * @param {?number} [slots] Number of slots that the session will have for purchase
   * @param {?number} [booked] Numver of slots that have been booked
   * @param {?string} [serviceDocId] FIrebase document id of the Service that the Session is of
   * @param {?boolean} [mandatoryFill] Boolean for if the Session needs to have all slots filled to be rendered
   * @param {?string} [name] Name of the Service Displayed on the calendar
   * @param {?string} [color] Defaulted to gray when the Session is not published, Changes to ServiceColor onces the Session is published
   * @param {?string} [serviceColor] Color that the Creator chooses before the Session is publised
   * @param {?number} [start] Start time in unix time format for when the Session starts
   * @param {?number} [end] Time in unix that the Session will end 
   * @param {?string} [id] Firebase document id of the document containing this session data
   * @param {?string} [status] Current status of the Session changes from Potential - Published - Full (If manditoryFill is true) - Active - Disputed (if the Supported disputes the session) - Succeeded (if payment intent is captured) - Cancled (If Creator cancles the session before its rendered) 
   */
  constructor(
    sellerUid?: string,
    slots?: number,
    booked?: number,
    serviceDocId?: string,
    mandatoryFill?: boolean,
    name?: string,
    color?: string,
    serviceColor?: string,
    start?: number,
    end?: number,
    id?: string,
    status?: string
  ) {
    this.sellerUid = sellerUid,
    this.slots = slots
    this.booked = booked
    this.serviceDocId = serviceDocId,
    this.mandatoryFill = mandatoryFill,
    this.name = name,
    this.color = color,
    this.serviceColor = serviceColor
    this.start = start,
    this.end = end,
    this.id = id,
    this.status = status
  }
}
