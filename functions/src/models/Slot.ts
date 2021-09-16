
/**
 * Export for Slot Class
 *
 * @class Slot
 * @typedef {Slot}
 * @module Slot
 * @category src
 * @subcategory models
 */
export default class Slot {
  id: string | undefined
  name: string | undefined
  slot: number  | undefined
  slots: number  | undefined
  mandatoryFill: boolean | undefined
  start: number | undefined
  end: number | undefined
  sellerUid: string | undefined
  serviceDocId: string | undefined
  buyerUid: string | undefined
  buyerUsername: string | undefined
  paymentIntent: string | undefined
  status: string | undefined
  parentSession: string | undefined

  
  /**
   * Creates an instance of Slot.
   *
   * @constructor
   * @param {?string} [id] Firebase document id for this session
   * @param {?string} [name] Name of the Service
   * @param {?number} [slot] Which slot this is out of all the slots
   * @param {?number} [slots] Number of slots total in the session
   * @param {?boolean} [mandatoryFill] Boolean if all slots must be sold for the Session to be rendered
   * @param {?number} [start] Start time in unix format that the session will start
   * @param {?number} [end] end time in unix format that the session will end 
   * @param {?string} [sellerUid] Firebase uid of the Creator
   * @param {?string} [serviceDocId] Firebase document id of the service that the Session is a session of
   * @param {?string} [buyerUid] Firebase uid of the Supporter who purchased this slot
   * @param {?string} [buyerUsername] Username of the Supporter who purchased this slot
   * @param {?string} [paymentIntent] Stripe payment intent for use when capturing the payment once the service is rendered
   * @param {?string} [status] Current status of the Slot changes from Published - Holding(while a user is checking out) - Booked - Active - Disputed (if the Supported disputes the session) - Succeeded (if payment intent is captured) - Cancled (If Creator cancles the session before its rendered) 
   * @param {?string} [parentSession] Firebase document id of the session this slot is a child of
   */
  constructor(
    id?: string,
    name?: string,
    slot?: number,
    slots?: number,
    mandatoryFill?: boolean,
    start?: number,
    end?: number,
    sellerUid?: string,
    serviceDocId?: string,
    buyerUid?: string,
    buyerUsername?: string,
    paymentIntent?: string,
    status?: string,
    parentSession?: string
  ) {
    this.id = id
    this.name = name
    this.slot = slot
    this.slots = slots
    this.mandatoryFill = mandatoryFill
    this.start = start
    this.end = end
    this.sellerUid = sellerUid
    this.serviceDocId = serviceDocId
    this.buyerUid = buyerUid
    this.buyerUsername = buyerUsername
    this.paymentIntent = paymentIntent
    this.status = status
    this.parentSession = parentSession
  }

}
