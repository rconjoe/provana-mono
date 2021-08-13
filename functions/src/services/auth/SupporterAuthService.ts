import { Supporter } from '../../models/Supporter'
import { auth } from '../../config'


export class SupporterAuthService {
  public async create(_newUser: Supporter): Promise<Supporter> {
    const newUser = await auth.createUser({
      email: _newUser.email,
      password: _newUser.temp,
      displayName: _newUser.username
    })
    .catch((err) => {
      throw new Error(err)
    })
    await this.customClaimSetter(newUser.uid, {
      seller: false,
      onboarded: false,
      isPartner: false
    })
    _newUser.temp = ""
    _newUser.uid = newUser.uid
    return _newUser
  }

  private async customClaimSetter(uid: string, claims: object): Promise<void> {
    await auth.setCustomUserClaims(uid, {...claims})
  }
}
