import { Supporter } from '../../models/Supporter'
import { Creator } from '../../models/Creator'
import { auth } from '../../config'
import { UserRecord } from 'firebase-functions/lib/providers/auth'


export class AuthUserService {
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
      isPartner: false
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
      isPartner: true
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
}
