import { UserRecord } from 'firebase-functions/lib/providers/auth'
import { Creator } from '../../models/Creator'
import { Supporter } from '../../models/Supporter'
import { auth } from '../../config'


export class CreateUserService {
  public async create(_newUser: Creator | Supporter): Promise<UserRecord> {
    return await auth.createUser({
      email: _newUser.email,
      password: _newUser.temp,
      displayName: _newUser.username
    })
    .catch((err) => {
      throw new Error(err)
    })
  }
}
