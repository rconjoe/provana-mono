import Slot from '../models/Slot'
import { db } from '../config'


/**
 * Converter for either mapping data to a Firestore document snapshot or from Firestore to SlotDBC object
 * @date 9/16/2021 - 2:56:46 PM
 *
 * @type {{ toFirestore(s: any): any; fromFirestore(snapshot: any): SlotDBC; }}
 */
const converter: FirebaseFirestore.FirestoreDataConverter<SlotDBC> = {
  toFirestore(s: Slot): FirebaseFirestore.DocumentData {
    return {
      id: s.id ? s.id : "",
      name: s.name ? s.name : "",
      slot: s.slot ? s.slot : 1,
      slots: s.slots ? s.slots : 1,
      mandatoryFill: s.mandatoryFill ? s.mandatoryFill : false,
      start: s.start ? s.start : 0,
      end: s.end ? s.end : 0,
      sellerUid: s.sellerUid ? s.sellerUid : "",
      serviceDocId: s.serviceDocId ? s.serviceDocId : "",
      buyerUid: s.buyerUid ? s.buyerUid : "",
      buyerUsername: s.buyerUsername ? s.buyerUsername : "",
      paymentIntent: s.paymentIntent ? s.paymentIntent : "",
      status: s.status ? s.status : "",
      parentSession: s.parentSession ? s.parentSession : "",
    }
  },
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): SlotDBC {
    const data = snapshot.data()
    return new SlotDBC(
      data.id,
      data.name,
      data.slot,
      data.slots,
      data.mandatoryFill,
      data.start,
      data.end,
      data.sellerUid,
      data.serviceDocId,
      data.buyerUid,
      data.buyerUsername,
      data.paymentIntent,
      data.status,
      data.parentSession,
      snapshot.ref
    )
  }
}


/**
 * Export for the SLotDBC class
 *
 * @class SlotDBC
 * @typedef {SlotDBC}
 * @extends {Slot}
 * @module SlotDBC
 * @category src
 * @subcategory dbc
 */
export default class SlotDBC extends Slot {
  ref: FirebaseFirestore.DocumentReference | undefined

  
  /**
   * Creates an instance of SlotDBC.
   * @date 9/16/2021 - 2:59:08 PM
   *
   * @constructor
   * @param {?string} [id] Firebase document id for this slot document
   * @param {?string} [name] Name of the service this is related to
   * @param {?number} [slot] Which slot this is out of all the slots of the session
   * @param {?number} [slots] Total number of slots available for the session
   * @param {?boolean} [mandatoryFill] Boolean if all the slots must be sold for this session to not be canceled
   * @param {?number} [start] The date-time in unix format that the session will start
   * @param {?number} [end] The date-time in unix format that the session will end
   * @param {?string} [sellerUid] The Creator's Firebase uid
   * @param {?string} [serviceDocId] Firebase document id of the service that this slot is related to
   * @param {?string} [buyerUid] The Supporter's Firebase uid
   * @param {?string} [buyerUsername] the Supporter's username
   * @param {?string} [paymentIntent] Stripe payment intent for use when capturing the payment once the service is rendered
   * @param {?string} [status] Current status of the Slot changes from Published - Holding(while a user is checking out) - Booked - Active - Disputed (if the Supported disputes the session) - Succeeded (if payment intent is captured) - Cancled (If Creator cancles the session before its rendered) 
   * @param {?string} [parentSession] Firebase document id of the session that this slot is related to
   * @param {?FirebaseFirestore.DocumentReference} [ref] Firebase document id that points to the document we either want to query or edit
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
    parentSession?: string,
    ref?: FirebaseFirestore.DocumentReference
  ) {
    super(
      id,
      name,
      slot,
      slots,
      mandatoryFill,
      start,
      end,
      sellerUid,
      serviceDocId,
      buyerUid,
      buyerUsername,
      paymentIntent,
      status,
      parentSession
    )
    this.ref = ref
  }

  
  /**
   * Creates a new Slot object out of the SlotDBC properties
   *
   * @public
   * @returns {Slot}
   */
  public toModel(): Slot {
    return new Slot(
      this.id,
      this.name,
      this.slot,
      this.slots,
      this.mandatoryFill,
      this.start,
      this.end,
      this.sellerUid,
      this.serviceDocId,
      this.buyerUid,
      this.buyerUsername,
      this.paymentIntent,
      this.status,
      this.parentSession
    )
  }

  
  /**
   * Method that updates the slot documents in Firestore and changes the status to 'published', and changes the color to the serviceColor
   *
   * @public
   * @async
   * @returns {Promise<FirebaseFirestore.WriteResult>}
   */
  public async publish(): Promise<FirebaseFirestore.WriteResult> {
    if (this.parentSession === undefined || this.parentSession === "") throw new Error("need parenSession ID")
    const newDoc = db.collection('sessions').doc(this.parentSession).collection('slots').doc()
    this.id = newDoc.id
    return await newDoc.withConverter(converter).set(this)
    .catch(err => {
      throw new Error(err)
    })
  }

  
  /**
   * Method that gets the data from the Firestore document when passed a session document id and the id of the slot document
   *
   * @public
   * @async
   * @param {string} session
   * @param {string} id
   * @returns {Promise<SlotDBC>}
   */
  public async fromPath(session: string, id: string): Promise<SlotDBC> {
    const slot = await db
      .collection('sessions').doc(session)
      .collection('slots').doc(id)
      .withConverter(converter)
      .get()
    if (!slot.exists) throw new Error("slot not found")
    return slot.data()!
  }

  
  /**
   * Method that updates any field on the Firestore document with the data passed in the data object paramater
   *
   * @public
   * @async
   * @param {*} data
   * @returns {Promise<FirebaseFirestore.WriteResult>}
   */
  public async update(data: any): Promise<FirebaseFirestore.WriteResult> {
    if (this.ref === null || this.ref === undefined) throw new Error('Ref required to update slot')
    return await this.ref.update({...data})
    .catch(err => {
      throw new Error(err)
    })
  }

  
  /**
   * Finds the proper Firestore document when provided with only the id of the Firebase document of the slot
   *
   * @public
   * @async
   * @param {string} id
   * @returns {Promise<SlotDBC>}
   */
  public async fromId(id: string): Promise<SlotDBC> {
    const q = await db
      .collectionGroup('slots')
      .where('id', '==', id)
      .withConverter(converter)
      .get()
    if (q.empty) throw new Error('Slot not found')
    return q.docs[0].data()
  }

  public async fetchByParent(parentSession: string): Promise<Array<SlotDBC>> {
    let slots: Array<SlotDBC> = []
    const q = await db
      .collection('sessions')
      .doc(parentSession)
      .collection('slots')
      .withConverter(converter)
      .get()
    if (q.empty) throw new Error(`No slots for session ${parentSession}`)
    q.docs.forEach(slot => {
      slots.push(slot.data())
    })
    return slots
  }

  public async republish(): Promise<void> {
    if (this.ref === undefined) throw new Error('Need ref to republish')
    this.ref.update({
      status: 'published',
      buyerUid: '',
      buyerUsername: '',
      paymentIntent: ''
    })
    .catch(err => {
      throw console.error(err)
    })
  }

  public async delete(): Promise<void> {
    await this.ref!.delete()
    .catch(err => {
      console.error(err)
    })
  }

  public async bookedFromParent(sessionId: string): Promise<Array<SlotDBC>> {
    let slots: Array<SlotDBC> = []
    let q = await db
      .collection('sessions')
      .doc(sessionId)
      .collection('slots')
      .where('status', '==', 'booked')
      .withConverter(converter)
    .get()
    if (!q.empty) {
      q.forEach(slot => {
        slots.push(slot.data())
      })
    }
    return slots
  }

  public async activeFromUid(uid: string): Promise<Array<Slot>> {
    let slots: Array<Slot> = []
    let q = await db.collectionGroup('slots')
      .where('buyerUid', '==', uid)
      .where('status', '==', 'active')
      .withConverter(converter)
      .get()
    if (q.size > 0) {
      q.forEach(slot => {
        slots.push(slot.data().toModel())
      })
    }
    return slots
  }

  public async disputedOfSeller(uid: string): Promise<Array<Slot>> {
    let slots: Array<Slot> = []
    let q = await db.collectionGroup('slots')
      .where('sellerUid', '==', uid)
      .where('status', '==', 'disputed')
      .withConverter(converter)
      .get()
    if (q.size > 0) {
      q.forEach(slot => {
        slots.push(slot.data().toModel())
      })
    }
    return slots
  }

  public async resolve(by: string): Promise<void> {
    if (this.id === "" || this.id === undefined) throw new Error('Pass slot ID in constructor to run resolve(by)')
    let slot = await this.fromId(this.id!)
    await slot.update({ status: 'resolved-seller' })
  }

}
