export default class PotentialSession {
  name: string | undefined
  slots: number | undefined
  mandatoryFill: boolean | undefined
  color: string | undefined
  serviceColor: string | undefined
  start: number | undefined
  end: number | undefined
  sellerUid: string | undefined
  serviceDocId: string | undefined
  status: string | undefined
  id: string | undefined

  constructor(
    name?: string,
    slots?: number,
    mandatoryFill?: boolean,
    color?: string,
    serviceColor?: string,
    start?: number,
    end?: number,
    sellerUid?: string,
    serviceDocId?: string,
    status?: string,
    id?: string
  ) {
    this.name = name,
    this.slots = slots,
    this.mandatoryFill = mandatoryFill,
    this.color = color,
    this.serviceColor = serviceColor,
    this.start = start,
    this.end = end,
    this.sellerUid = sellerUid,
    this.serviceDocId = serviceDocId,
    this.status = status,
    this.id = id
  }
}