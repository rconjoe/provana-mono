export default class Service {

  id: string | undefined
  serviceName: string | undefined
  serviceDescription: string | undefined
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

  constructor(
    id?: string,
    serviceName?: string,
    serviceDescription?: string,
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
