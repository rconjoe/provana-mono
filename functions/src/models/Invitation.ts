import { InvitationDBC } from '../dbc/InvitationDBC'

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

  public async getOrCreate(): Promise<Invitation> {
    if (this.id === null || this.id === undefined) throw new Error('Discord ID is required to get or create')
    return (await this.exists()) ? await this.getFromDB() : await this.create()
  }

  public async validate(code?: string | undefined): Promise<boolean> {
    if (this.code === null || this.code === undefined) throw new Error('No code to validate!')
    return await new InvitationDBC().isValid(this.code)
  }

  public async associateUID(): Promise<FirebaseFirestore.WriteResult> {
    if (this.code === null || this.code === undefined) throw new Error('No code!')
    if (this.uid === null || this.uid === undefined) throw new Error('No code!')
    const dbc = new InvitationDBC()
    dbc.uid = this.uid
    dbc.code = this.code
    return await dbc.associate()
  }

  private async getFromDB(): Promise<Invitation> {
    if (this.id === null || this.id === undefined) throw new Error('Discord ID is required to fetch invitation.')
    const dbc = await new InvitationDBC(this.id).getFromId()
    return dbc.toModel()
  }

  private async create(): Promise<Invitation> {
    const newDBC = await new InvitationDBC().createNew(this.id!)
    return newDBC.toModel()
  }

  private async exists(): Promise<boolean> {
    const dbc = new InvitationDBC(this.id)
    return await dbc.existsInDatabase()
  }
}