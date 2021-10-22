import Session from '../models/Session'
import { db } from '../config'
import { increment, decrement } from '../util'


/**
 * Converter for either mapping data to a Firestore document snapshot or from Firestore to SessionDBC object
 *
 * @type {{ toFirestore(s: SessionDBC): any; fromFirestore(snapshot: any): SessionDBC; }}
 */
const converter = {
  toFirestore(s: SessionDBC): FirebaseFirestore.DocumentData {
    return {
      sellerUid: s.sellerUid ? s.sellerUid : "",
      slots: s.slots ? s.slots : 1,
      booked: s.booked ? s.booked : 1,
      serviceDocId: s.serviceDocId ? s.serviceDocId : "",
      mandatoryFill: s.mandatoryFill ? s.mandatoryFill : "",
      name: s.name ? s.name : "",
      color: s.color ? s.color : "",
      serviceColor: s.serviceColor ? s.serviceColor : "",
      start: s.start ? s.start : 0,
      end: s.end ? s.end : 0,
      id: s.id ? s.id : "",
      status: s.status ? s.status : "",
    }
  },
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): SessionDBC {
    const data = snapshot.data()
    return new SessionDBC(
      data.sellerUid,
      data.slots,
      data.booked,
      data.serviceDocId,
      data.mandatoryFill,
      data.name,
      data.color,
      data.serviceColor,
      data.start,
      data.end,
      data.id,
      data.status,
      snapshot.ref
    )
  }
}


/**
 * Export for the SessionDBC class
 *
 * @class SessionDBC
 * @typedef {SessionDBC}
 * @extends {Session}
 * @module SessionDBC
 * @category src
 * @subcategory dbc
 */
export default class SessionDBC extends Session {
  ref: FirebaseFirestore.DocumentReference | undefined

  
  /**
   * Creates an instance of SessionDBC.
   *
   * @constructor
   * @param {?string} [sellerUid] Creator's Firebase uid
   * @param {?number} [slots] Total number of slots available for the session
   * @param {?number} [booked] How many of slots are currently booked for this session
   * @param {?string} [serviceDocId] Firestore document id for the service this is a session of
   * @param {?boolean} [mandatoryFill] Boolean for if all slots need to be booked for this session to not be canceled
   * @param {?string} [name] The name that will apear on the calendar
   * @param {?string} [color] Defaulted to gray when the Session is not published, Changes to ServiceColor onces the Session is published 
   * @param {?string} [serviceColor] Color that the Creator chooses before the session is publised
   * @param {?number} [start] The date-time in unix format for when the session will start
   * @param {?number} [end] the date-time in unix format for when the session will end
   * @param {?string} [id] Firebase document id of the document containing this session data
   * @param {?string} [status] Current status of the Session changes from Potential - Published - Full (If manditoryFill is true) - Active - Disputed (if the Supported disputes the session) - Succeeded (if payment intent is captured) - Cancled (If Creator cancles the session before its rendered) 
   * @param {?FirebaseFirestore.DocumentReference} [ref] Firestore document reference of the document in the 'session' collection that we want to either query data from or edit
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
    status?: string,
    ref?: FirebaseFirestore.DocumentReference
  ) {
    super(sellerUid, slots, booked, serviceDocId, mandatoryFill, name, color, serviceColor, start, end, id, status)
    this.ref = ref
  }

  public toModel(): Session {
    return new Session(
      this.sellerUid,
      this.slots,
      this.booked,
      this.serviceDocId,
      this.mandatoryFill,
      this.name,
      this.color,
      this.serviceColor,
      this.start,
      this.end,
      this.id,
      this.status
    )
  } 
  /**
   * Setter method to set the sellerUid property
   *
   * @public
   * @param {string} uid
   * @returns {SessionDBC}
   */
  public setSellerUid(uid: string): SessionDBC {
    this.sellerUid = uid
    return this
  }

  
  /**
   * Method that updates the session documents in Firestore and changes the status to 'published', and changes the color to the serviceColor
   *
   * @public
   * @async
   * @returns {Promise<void>}
   */
  public async publish(): Promise<void> {
    const potentials = await this.fetchPotentials()
    potentials.forEach(async (session) => {
      return await session.ref!.update({
        color: session.serviceColor,
        status: 'published'
      })
    })
  }

  
  /**
   * Method that takes the name of a Firestore document and goes into the 'session' collection, and finds that documents and returns the data in that document
   *
   * @public
   * @async
   * @param {string} id
   * @returns {Promise<SessionDBC>}
   */
  public async fetch(id: string): Promise<SessionDBC> {
    const session = await db
      .collection('sessions')
      .doc(id)
      .withConverter(converter)
      .get()
    return session.data()!
  }

  
  /**
   * Finds all of the session documents in the 'sessions' collection that contain a sellerUid that matches the sellerUid property of the object where the status is set to 'potential'
   * 
   * @private
   * @async
   * @returns {Promise<Array<SessionDBC>>}
   */
  private async fetchPotentials(): Promise<Array<SessionDBC>> {
    if (this.sellerUid === undefined) throw new Error('Missing sellerUid')
    let a: Array<SessionDBC> = []
    const q = await db.collection('sessions').where('sellerUid', '==', this.sellerUid)
      .where('status', '==', 'potential').withConverter(converter).get()
    q.forEach(doc => {
      a.push(doc.data())
    })
    return a
  }

  public async update(data: any): Promise<void> {
    if(this.ref === undefined) throw new Error('Need ref to update')
    await this.ref.update({...data})
    .catch(err => {
      throw new Error(err)
    })
  }

  
  /**
   * Takes a Firestore document id, and goes to that document and updates the booked field by +1
   *
   * @public
   * @async
   * @param {string} id
   * @returns {Promise<void>}
   */
  public async increment(id: string): Promise<void> {
    await increment({
      ref: db.collection('sessions').doc(id),
      field: 'booked',
      amount: 1
    })
  }

  
  /**
   * Takes a Firestore document id, and goes to that document and updates the booked field by -1
   *
   * @public
   * @async
   * @param {string} id
   * @returns {Promise<void>}
   */
  public async decrement(id: string): Promise<void> {
    await decrement({
      ref: db.collection('sessions').doc(id),
      field: 'booked',
    })
  }

  public async fetchBooked(sellerUid: string): Promise<Array<Session>> {
    let sessions: Array<Session> = []
    const qsessions = await db
      .collection('sessions')
      .where('sellerUid', '==', sellerUid)
      .where('booked', '>', 0)
      .withConverter(converter)
      .get()
    if (!qsessions.empty) {
      qsessions.forEach(session => {
        sessions.push(session.data()!.toModel())
      })
    }
    return sessions
  }

}
