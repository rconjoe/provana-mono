import Supporter from '../../models/Supporter'
import Creator from '../../models/Creator'
import { auth } from '../../config'
import { UserRecord } from 'firebase-functions/lib/providers/auth'

export default class AuthUserService {
  public async registerSupporter(_newUser: Supporter): Promise<Supporter> {
    const newUser = await auth.createUser({
      email: _newUser.email,
      password: _newUser.temp,
      displayName: _newUser.username
    })
    .catch((err) => {
      throw new Error(err)
    })
    await this.customClaimSetter(newUser.uid, {
      type: 'supporters',
    })
    _newUser.temp = ""
    _newUser.uid = newUser.uid
    return _newUser
  }

  public async registerCreator(_newUser: Creator): Promise<Creator> {
    const newUser = await auth.createUser({
      email: _newUser.email,
      password: _newUser.temp,
      displayName: _newUser.username
    })
    .catch((err) => {
      throw new Error(err)
    })
    await this.customClaimSetter(newUser.uid, {
      type: 'creators',
    })
    _newUser.temp = ""
    _newUser.uid = newUser.uid
    return _newUser
  }

  private async customClaimSetter(uid: string, claims: object): Promise<void> {
    await auth.setCustomUserClaims(uid, {...claims})
  }

  public async getUser(uid: string): Promise<UserRecord> {
    return await auth.getUser(uid)
  }

  public async toEmail(uid: string): Promise<string> {
    const user = await this.getUser(uid)
    if (!user.email) throw new Error('This user does not have an email and has probably been deleted')
    return user.email
  }
}
