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
