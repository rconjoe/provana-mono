export default class Session {
  id: string | undefined
  sellerUid: string | undefined
  buyerUid: string | undefined
  buyerUsername: string | undefined
  paymentIntent: string | undefined
  serviceDocId: string | undefined
  name: string | undefined
  color: string | undefined
  serviceColor: string | undefined
  start: number | undefined
  end: number | undefined
  status: string | undefined

  constructor(
    id?: string,
    sellerUid?: string,
    buyerUid?: string,
    buyerUsername?: string,
    paymentIntent?: string,
    serviceDocId?: string,
    name?: string,
    color?: string,
    serviceColor?: string,
    start?: number,
    end?: number,
    status?: string
  ) {
    this.id = id,
    this.sellerUid = sellerUid,
    this.buyerUid = buyerUid,
    this.buyerUsername = buyerUsername,
    this.paymentIntent = paymentIntent,
    this.serviceDocId = serviceDocId,
    this.name = name,
    this.color = color,
    this.serviceColor = serviceColor,
    this.start = start,
    this.end = end,
    this.status = status
  }
}