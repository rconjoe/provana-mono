
export class Invitation {

  id: string | undefined
  code: string | undefined
  generated: number | undefined
  valid: boolean | undefined
  uid: string | undefined

  constructor(
  id?: string | undefined,
  code?: string | undefined,
  generated?: number | undefined,
  valid?: boolean | undefined,
  uid?: string | undefined,
  ) {
    this.id = id,
    this.code = code,
    this.generated = generated,
    this.valid = valid,
    this.uid = uid
  }

}