import { db } from '../config'
import Creator from '../models/Creator'
import InvitationDBC from '../dbc/InvitationDBC'
import DiscordLinkDBC from '../dbc/DiscordLinkDBC'


/**
 * Converter for either mapping data to a Firestore document snapshot or from Firestore to a CreatorDBC object
 *
 * @returns {{ toFirestore(creator: CreatorDBC): any; fromFirestore(snapshot: any): CreatorDBC; }}
 */
const converter = {
  toFirestore(creator: CreatorDBC): FirebaseFirestore.DocumentData {
    return {
      uid: creator.uid ? creator.uid : "",
      customer: creator.customer ? creator.customer : "",
      account: creator.account ? creator.account : "",
      onboarded: creator.onboarded ? creator.onboarded : false,
      partner: creator.partner ? creator.partner : false,
      email: creator.email ? creator.email : "",
      temp: creator.temp ? creator.temp : "",
      code: creator.code ? creator.code : "",
      username: creator.username ? creator.username : "",
      timezone: creator.timezone ? creator.timezone : "",
      avatar: creator.avatar ? creator.avatar : "",
      banner: creator.banner ? creator.banner : "",
      twitter: creator.twitter ? creator.twitter : "",
      twitch: creator.twitch ? creator.twitch : "",
      youtube: creator.youtube ? creator.youtube : "",
      facebook: creator.facebook ? creator.facebook : "",
      discord: creator.discord ? creator.discord : "",
      online: creator.online ? creator.online : false
    }
  },
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): CreatorDBC {
    const data = snapshot.data()
    return new CreatorDBC(
      data.uid,
      data.customer,
      data.account,
      data.onboarded,
      data.partner,
      data.email,
      data.temp,
      data.code,
      data.username,
      data.timezone,
      data.avatar,
      data.banner,
      data.twitter,
      data.twitch,
      data.youtube,
      data.facebook,
      data.discord,
      data.online,
      snapshot.ref
    )
  }
}


/**
 * Export for new CreatorDBC object
 *
 * @class CreatorDBC
 * @typedef {CreatorDBC}
 * @extends {Creator}
 * @module CreatorDBC
 * @category src
 * @subcategory dbc
 */
export default class CreatorDBC extends Creator {

  ref: FirebaseFirestore.DocumentReference | undefined

  
  /**
   * Creates an instance of CreatorDBC.
   * @date 9/15/2021 - 2:27:35 PM
   *
   * @constructor
   * @param {?(string | undefined)} [uid] Creator's Firebase uid
   * @param {?(string | undefined)} [customer] Creator's Stripe customer id from the Stripe Accounts api
   * @param {?(string | undefined)} [account] Creator's Stripe account id from the Stripe Accounts api
   * @param {?(boolean | undefined)} [onboarded] Boolean if a user has onboarded with stripe 
   * @param {?(boolean | undefined)} [partner] Boolean if a user is an alpha partner
   * @param {?(string | undefined)} [email] Creator's email address
   * @param {?(string | undefined)} [temp] Temporary field that contains the user's password during the sign up process
   * @param {?(string | undefined)} [code] Alpha partner registration code, generated and dispensed from the discord bot
   * @param {?(string | undefined)} [username] Creator's chosen username
   * @param {?(string | undefined)} [timezone] Creator's timezone, its automatically picked at first but can be changed by the creator later
   * @param {?(string | undefined)} [avatar] Creator's avatar picture url
   * @param {?(string | undefined)} [banner] Creator's storefront banner picture url
   * @param {?(string | undefined)} [twitter] Creator's twitter handle
   * @param {?(string | undefined)} [twitch] Creator's twitch channel
   * @param {?(string | undefined)} [youtube] Creator's youtube channel
   * @param {?(string | undefined)} [facebook] Creator's facebook page
   * @param {?(boolean | undefined)} [online] Boolean that is true if a user is currently on the website, false when they do not have an instance of the website open
   * @param {?(FirebaseFirestore.DocumentReference | undefined)} [ref] Firebase Firestore document reference, where the user's document with their data is stored in the 'creator' collection
   */
  constructor(
    uid?: string | undefined,
    customer?: string | undefined,
    account?: string | undefined,
    onboarded?: boolean | undefined,
    partner?: boolean | undefined,
    email?: string | undefined,
    temp?: string | undefined,
    code?: string | undefined,
    username?: string | undefined,
    timezone?: string | undefined,
    avatar?: string | undefined,
    banner?: string | undefined,
    twitter?: string | undefined,
    twitch?: string | undefined,
    youtube?: string | undefined,
    facebook?: string | undefined,
    discord?: string | undefined,
    online?: boolean | undefined,
    ref?: FirebaseFirestore.DocumentReference | undefined,
  ) {
    super(uid, customer, account, onboarded, partner, email, temp, code, username, timezone, avatar, banner, twitter, twitch, youtube, facebook, discord, online)
    this.ref = ref
  }

  
  /**
   * Method that takes the CreatorDBC properties and creates a new Creator object out of them
   *
   * @returns {Creator}
   */
  toModel(): Creator {
    return new Creator(
      this.uid,
      this.customer,
      this.account,
      this.onboarded,
      this.partner,
      this.email,
      this.temp,
      this.code,
      this.username,
      this.timezone,
      this.avatar,
      this.banner,
      this.twitter,
      this.twitch,
      this.youtube,
      this.facebook,
      this.discord,
      this.online
    )
  }

  
  /**
   * Setter method to set the uid property
   *
   * @public
   * @param {string} uid
   * @returns {CreatorDBC}
   */
  public setUid(uid: string): CreatorDBC {
    this.uid = uid
    return this
  }

  
  /**
   * Method that writes a new Firebase doc with the Creator properties
   *
   * @public
   * @async
   * @param {Creator} creator
   * @returns {Promise<FirebaseFirestore.WriteResult>}
   */
  public async writeNew(creator: Creator): Promise<FirebaseFirestore.WriteResult> {
    if (creator.uid === null || creator.uid === undefined) throw new Error('Missing UID')
      this.uid = creator.uid
      this.customer = creator.customer
      this.account = creator.account
      this.onboarded = false
      this.partner = true
      this.email = creator.email
      this.code = creator.code
      this.username = creator.username
      const docRef = db.collection('creators').doc(this.uid!)
      this.ref = docRef

      this.discord = await new InvitationDBC().associate(this.toModel())
      await new DiscordLinkDBC(creator.uid, 'creators').write(this.discord)
      await db.collection('notifications').doc(this.uid)
        .set({ uid: this.uid })
        .catch(err => console.error(err))

      return await this.ref.withConverter(converter).set(this)
      .catch((err) => {
        throw new Error(err)
      })
  }

  
  /**
   * Query Firestore's 'creators' collection by a uid, to get back the contents of that creator document
   *
   * @public
   * @async
   * @returns {Promise<Creator>}
   */
  public async fetchByUid(uid?: string): Promise<CreatorDBC> {
    const _uid = uid ? uid : this.uid!
    const creator = await db.collection('creators').doc(_uid).withConverter(converter).get()
    if (creator.data() === undefined) throw new Error('Creator not found in firestore.')
    return creator.data()!
  }

  
  /**
   * Calls fetchByUid() method to get the contents of that creators Firestor document and returns the Stripe account id
   *
   * @public
   * @async
   * @returns {Promise<string>}
   */
  public async fetchAccountId(): Promise<string> {
    if (!this.uid) throw new Error('UID required')
    const creator = await this.fetchByUid()
    if(creator.account === "") throw new Error('Missing account ID in firestore!')
    return creator.account!
  }

  
  /**
   * Takes the passed data in the paramaters and updates the Firestore creator document, requires a Firebase uid be sent in the data object
   *
   * @private
   * @async
   * @param {object} data
   * @returns {Promise<FirebaseFirestore.WriteResult>}
   */
  private async update(data: object): Promise<FirebaseFirestore.WriteResult> {
    if (this.uid === "" || this.uid === undefined) throw new Error('UID required to update document.')
    return await db.collection('creators').doc(this.uid).update({...data})
    .catch((err) => {
      throw new Error(err)
    })
  }

  
  /**
   * Calls the update() method to updated the Firestore creator document to update the onboarded boolean to true after a user has onboarded with Stripe
   *
   * @public
   * @async
   * @param {boolean} onboarded
   * @returns {Promise<FirebaseFirestore.WriteResult>}
   */
  public async completeOnboard(onboarded: boolean): Promise<FirebaseFirestore.WriteResult> {
    return await this.update({onboarded: onboarded})
      .catch((err) => {
        throw new Error(err)
      })
  }
  
}
