import Supporter from '../../models/Supporter'
import Creator from '../../models/Creator'
import { auth } from '../../admin'
import { UserRecord } from 'firebase-functions/lib/providers/auth'


/**
 * Export for the AuthUserService class
 *
 * @class AuthUserService
 * @typedef {AuthUserService}
 * @module AuthUserService
 * @category src
 * @subcategory services/auth
 */
export default class AuthUserService {

  
  /**
   * Method that takes a Supporter object and uses Firebase's admin sdk to create a new Firebase user and gives them a 'supporters' custom claim 
   *
   * @public
   * @async
   * @param {Supporter} _newUser
   * @returns {Promise<Supporter>}
   */
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

  
  /**
   * Method that takes a Creator object and uses Firebase's admin sdk to create a new Firebase user and gives them a 'creators' custom claim 
   *
   * @public
   * @async
   * @param {Creator} _newUser
   * @returns {Promise<Creator>}
   */
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

  
  /**
   * Takes a firebase uid of the user and a object and sets their uid and the properties of the object into the Firebase custom claims
   *
   * @private
   * @async
   * @param {string} uid
   * @param {object} claims
   * @returns {Promise<void>}
   */
  private async customClaimSetter(uid: string, claims: object): Promise<void> {
    await auth.setCustomUserClaims(uid, {...claims})
  }

  
  /**
   * Takes a Firebase user uid and uses the Firebase admin sdk's function getUser() to get the Firebase UserRecord of that user
   *
   * @public
   * @async
   * @param {string} uid
   * @returns {Promise<UserRecord>}
   */
  public async getUser(uid: string): Promise<UserRecord> {
    return await auth.getUser(uid)
  }

  
  /**
   * Takes a Firebase user uid and as long as the user has a email attached to their account, it will return that user's email
   *
   * @public
   * @async
   * @param {string} uid
   * @returns {Promise<string>}
   */
  public async toEmail(uid: string): Promise<string> {
    const user = await this.getUser(uid)
    if (!user.email) throw new Error('This user does not have an email and has probably been deleted')
    return user.email
  }

  public async typeOf(uid: string): Promise<string> {
    const user = await this.getUser(uid)
    return user.customClaims!.type!
  }
}
