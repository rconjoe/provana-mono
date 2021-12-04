
/**
 * Service Class
 *
 * @class Service
 * @typedef {Service}
 * @module Service
 * @category src
 * @subcategory models
 */
export default class Service {

  id: string | undefined
  serviceName: string | undefined
  serviceDescription: string | undefined
  terms: Array<string> | undefined
  serviceCost: number | undefined
  serviceLength: number | undefined
  tags: Array<string> | undefined
  color: string | undefined
  software: string | undefined
  attendees: number | undefined
  mandatoryFill: boolean | undefined
  sessionDocIdArray: Array<string> | undefined
  uid: string | undefined
  stripePrice: string | undefined
  active: boolean | undefined

  
  /**
   * Creates an instance of Service.
   *
   * @constructor
   * @param {?string} [id] Firebase document id in the services collection
   * @param {?string} [serviceName] Name of the service 
   * @param {?string} [serviceDescription] Description of the service
   * @param {?number} [serviceCost] Cost of the service 
   * @param {?number} [serviceLength] Total time the service will be held
   * @param {?Array<string>} [tags] Tags used for searching for services
   * @param {?string} [color] Color of the service on the calendar 
   * @param {?string} [software] Software and or game that will be used during the service
   * @param {?number} [attendees] Number of attendees that will be in the service excluding the Creator
   * @param {?boolean} [mandatoryFill] Boolean of if all slots must be sold for the service to not be canceled
   * @param {?Array<string>} [sessionDocIdArray] Array of firebase document id's of the sessions attached to the service
   * @param {?string} [uid] Firebase uid of the Creator of the Service
   * @param {?string} [stripePrice] Price on stripe of the service
   * @param {?boolean} [active] Boolean of if the service session has been posted to the calendar
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
    active?: boolean
  ) {
    this.id = id,
    this.serviceName = serviceName,
    this.serviceDescription = serviceDescription,
    this.terms = terms,
    this.serviceCost = serviceCost,
    this.serviceLength = serviceLength,
    this.tags = tags,
    this.color = color,
    this.software = software,
    this.attendees = attendees,
    this.mandatoryFill = mandatoryFill,
    this.sessionDocIdArray = sessionDocIdArray,
    this.uid = uid,
    this.stripePrice = stripePrice,
    this.active = active
  }

}
