import { db } from '../config'
import Service from '../models/Service'


/**
 * Converter for either mapping data to a Firestore document snapshot or from Firestore to ServiceDBC object
 *
 * @type {{ toFirestore(service: ServiceDBC): any; fromFirestore(snapshot: any): ServiceDBC; }}
 */
const converter = {
  toFirestore(service: ServiceDBC): FirebaseFirestore.DocumentData {
    return {
      id: service.id ? service.id : "",
      serviceName: service.serviceName ? service.serviceName : "",
      serviceDescription: service.serviceDescription ? service.serviceDescription : "",
      terms: service.terms ? service.terms : [],
      serviceCost: service.serviceCost ? service.serviceCost : 0,
      serviceLength: service.serviceLength ? service.serviceLength : 0,
      tags: service.tags ? service.tags : [],
      color: service.color ? service.color : "",
      software: service.software ? service.software : "",
      attendees: service.attendees ? service.attendees : 0,
      mandatoryFill: service.mandatoryFill ? service.mandatoryFill : false,
      sessionDocIdArray: service.sessionDocIdArray ? service.sessionDocIdArray : [],
      uid: service.uid ? service.uid : "",
      stripePrice: service.stripePrice ? service.stripePrice : "",
      active: service.active ? service.active : true
    }
  },
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): ServiceDBC {
    const data = snapshot.data()
    return new ServiceDBC(
      data.id,
      data.serviceName,
      data.serviceDescritpion,
      data.terms,
      data.serviceCost,
      data.serviceLength,
      data.tags,
      data.color,
      data.software,
      data.attendees,
      data.mandatoryFill,
      data.sessionDocIdArray,
      data.uid,
      data.stripePrice,
      data.active,
      snapshot.ref
    )
  }
}


/**
 * Export for the ServiceDBC object
 *
 * @class ServiceDBC
 * @typedef {ServiceDBC}
 * @extends {Service}
 * @module ServiceDBC
 * @category src
 * @subcategory dbc
 */
export default class ServiceDBC extends Service {

  ref: FirebaseFirestore.DocumentReference | undefined

  
  /**
   * Creates an instance of ServiceDBC.
   *
   * @constructor
   * @param {?string} [id] Id of the Firestore document
   * @param {?string} [serviceName] The name that the Creator gave the service
   * @param {?string} [serviceDescription] The description of the service that the Creator gave it
   * @param {?number} [serviceCost] Cost of the service in USD
   * @param {?number} [serviceLength] The length of time that the service will take
   * @param {?Array<string>} [tags] Key words given by the Creator, for use when searching for a Service
   * @param {?string} [color] The color that the service will show up as on the calendar
   * @param {?string} [software] The software that will be used during the session
   * @param {?number} [attendees] Number of Supporters that can book a slot on the session
   * @param {?boolean} [mandatoryFill] Boolean if all slots must be sold for a session to not be canceled 
   * @param {?Array<string>} [sessionDocIdArray] Array of firebase document id's that point to all the sessions of this service
   * @param {?string} [uid] Creator's Firebase uid
   * @param {?string} [stripePrice] Stripe price id, from the Stripe Price api, sent during checkout to create a Stripe payment intent
   * @param {?boolean} [active] Used by the front end, to toggle being able to see this service, only set to false when a Creator deletes a service that still has booked sessions
   * @param {?FirebaseFirestore.DocumentReference} [ref] Firestore document reference that points to the proper document we want to retrive data from or edit
   */
  constructor(
    id?: string,
    serviceName?: string,
    serviceDescription?: string,
    terms?: Array<string>,
    serviceCost?: number,
    serviceLength?: number,
    tags?: Array<string>,
    color?: string,
    software?: string,
    attendees?: number,
    mandatoryFill?: boolean,
    sessionDocIdArray?: Array<string>,
    uid?: string,
    stripePrice?: string,
    active?: boolean,
    ref?: FirebaseFirestore.DocumentReference
  ) {
    super(
      id,
      serviceName,
      serviceDescription,
      terms,
      serviceCost,
      serviceLength,
      tags,
      color,
      software,
      attendees,
      mandatoryFill,
      sessionDocIdArray,
      uid,
      stripePrice,
      active
    )
    this.ref = ref
  }

  
  /**
   * Method that takes the properties of the ServiceDBC and creates a new Service object out of them
   *
   * @public
   * @returns {Service}
   */
  public toModel(): Service {
    return new Service(
      this.id,
      this.serviceName,
      this.serviceDescription,
      this.terms,
      this.serviceCost,
      this.serviceLength,
      this.tags,
      this.color,
      this.software,
      this.attendees,
      this.mandatoryFill,
      this.sessionDocIdArray,
      this.uid,
      this.stripePrice,
      this.active
    )
  }

  
  /**
   * Method that creates a new Firestoer document inside the 'services' collection and sets the id, and active property of the ServiceDBC object
   *
   * @public
   * @async
   * @returns {Promise<ServiceDBC>}
   */
  public async initialize(): Promise<ServiceDBC> {
    this.ref = db.collection('services').doc()
    this.id = this.ref.id
    this.active = true
    await this.ref.withConverter(converter).set(this)
    .catch((err) => {
      throw new Error(err)
    })
    return this
  }

  
  /**
   * Method that updates any field and value on a service on the Firestore document
   *
   * @public
   * @async
   * @param {string} field
   * @param {*} value
   * @returns {Promise<FirebaseFirestore.WriteResult>}
   */
  public async update(field: string, value: any): Promise<FirebaseFirestore.WriteResult> {
    if (this.id === undefined || this.id === "") throw new Error('requires ID')
    return await db.collection('services').doc(this.id).update({
      [field]: value
    })
    .catch((err) => {
      throw new Error(err)
    })
  }

  
  /**
   * Method that updates the price of a service on the Firestore document
   * @date 9/16/2021 - 2:09:43 PM
   *
   * @public
   * @async
   * @param {string} price
   * @returns {Promise<FirebaseFirestore.WriteResult>}
   */
  public async updatePrice(price: string): Promise<FirebaseFirestore.WriteResult> {
    if (this.id === undefined || this.id === "") throw new Error('requires ID')
    return await db.collection('services').doc(this.id).update({
      stripePrice: price
    })
  }
}
