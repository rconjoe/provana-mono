import { db } from '../config'
import { Service } from '../models/Service'

const converter = {
  toFirestore(service: ServiceDBC): FirebaseFirestore.DocumentData {
    return {
      id: service.id ? service.id : "",
      serviceName: service.serviceName ? service.serviceName : "",
      serviceDescrption: service.serviceDescription ? service.serviceDescription : "",
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
      active: service.active ? service.active : false
    }
  },
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): ServiceDBC {
    const data = snapshot.data()
    return new ServiceDBC(
      data.id,
      data.serviceName,
      data.serviceDescritpion,
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

export class ServiceDBC extends Service {

  ref: FirebaseFirestore.DocumentReference | undefined

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
    active?: boolean,
    ref?: FirebaseFirestore.DocumentReference
  ) {
    super(
      id,
      serviceName,
      serviceDescription,
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

  public toModel(): Service {
    return new Service(
      this.id,
      this.serviceName,
      this.serviceDescription,
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

  public callData(
    serviceName: string,
    serviceCost: number,
    serviceDescription: string,
    serviceLength: number,
    attendees: number,
    tags: Array<string>,
    software: string,
    mandatoryFill: boolean,
    serviceColor: string,
    uid: string
  ): ServiceDBC {
    this.serviceName = serviceName
    this.serviceCost = serviceCost
    this.serviceDescription = serviceDescription
    this.serviceLength = serviceLength
    this.attendees = attendees
    this.tags = tags
    this.software = software
    this.mandatoryFill = mandatoryFill
    this.color = serviceColor
    this.uid = uid
    return this
  }

  public async initialize(): Promise<ServiceDBC> {
    this.ref = db.collection('services').doc()
    this.id = this.ref.id
    await this.ref.withConverter(converter).set(this)
    .catch((err) => {
      throw new Error(err)
    })
    return this
  }

  public async update(field: string, value: any): Promise<FirebaseFirestore.WriteResult> {
    if (this.id === undefined || this.id === "") throw new Error('requires ID')
    return await db.collection('services').doc(this.id).update({
      field: value
    })
    .catch((err) => {
      throw new Error(err)
    })
  }

  public async updatePrice(price: string): Promise<FirebaseFirestore.WriteResult> {
    if (this.id === undefined || this.id === "") throw new Error('requires ID')
    return await db.collection('services').doc(this.id).update({
      stripePrice: price
    })
  }
}