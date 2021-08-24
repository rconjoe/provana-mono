export default class Session {
  sellerUid: string | undefined
  slots: number | undefined
  serviceDocId: string | undefined
  mandatoryFill: boolean | undefined
  name: string | undefined
  color: string | undefined
  serviceColor: string | undefined
  start: number | undefined
  end: number | undefined
  id: string | undefined
  status: string | undefined

  constructor(
    sellerUid?: string,
    slots?: number,
    serviceDocId?: string,
    mandatoryFill?: boolean,
    name?: string,
    color?: string,
    serviceColor?: string,
    start?: number,
    end?: number,
    id?: string,
    status?: string
  ) {
    this.sellerUid = sellerUid,
    this.slots = slots
    this.serviceDocId = serviceDocId,
    this.mandatoryFill = mandatoryFill,
    this.name = name,
    this.color = color,
    this.serviceColor = serviceColor
    this.start = start,
    this.end = end,
    this.id = id,
    this.status = status
  }
}