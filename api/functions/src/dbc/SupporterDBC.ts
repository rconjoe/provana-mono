import { db } from '../admin'
import Supporter from '../models/Supporter'
import DiscordLinkDBC from './DiscordLinkDBC'
/**
 * Converter for either mapping data to a Firestore document snapshot or from Firestore to SupporterDBC object
 * 
 * @returns {{ toFirestore(invitation: InvitationDBC): any; fromFirestore(snapshot: any): InvitationDBC; }}
 */
const converter = {
  toFirestore(supporter: SupporterDBC): FirebaseFirestore.DocumentData {
    return {
      uid: supporter.uid ? supporter.uid : "",
      customer: supporter.customer ? supporter.customer : "",
      email: supporter.email ? supporter.email : "",
      username: supporter.username ? supporter.username : "",
      vanity: supporter.vanity ? supporter.vanity : "",
      discord: supporter.discord ? supporter.discord : "",
      timezone: supporter.timezone ? supporter.timezone : "",
      avatar: supporter.avatar ? supporter.avatar : "",
      banner: supporter.banner ? supporter.banner : "",
      online: supporter.online ? supporter.online : false
    }
  },
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): SupporterDBC {
    const data = snapshot.data()
    return new SupporterDBC(
      data.uid,
      data.customer,
      data.email,
      data.temp,
      data.discord,
      data.username,
      data.vanity,
      data.timezone,
      data.avatar,
      data.banner,
      data.online,
      snapshot.ref
    )
  }
}


/**
 * Export for the SupporterDBC class
 * 
 * @class SupporterDBC
 * @typedef {SupporterDBC}
 * @extends {Supporter}
 * @module SupporterDBC
 * @category src
 * @subcategory dbc
 */
export default class SupporterDBC extends Supporter {

  ref: FirebaseFirestore.DocumentReference | undefined

  
  /**
   * Creates an instance of SupporterDBC.
   *
   * @constructor
   * @param {?(string | undefined)} [uid] Supporter's Firebase uid
   * @param {?(string | undefined)} [customer] Supporter's Stripe customer id from the Stripe Accounts api
   * @param {?(string | undefined)} [email] Supporter's email address
   * @param {?(string | undefined)} [temp] Temporary field that contains the user's password during the sign up process
   * @param {?(string | undefined)} [username] Supporter's chosen username
   * @param {?(string | undefined)} [timezone] Supporter's timezone, its automatically picked at first but can be changed by the supporter later
   * @param {?(string | undefined)} [avatar] Supporter's avatar picture url
   * @param {?(string | undefined)} [banner] Supporter's banner picture url
   * @param {?(boolean | undefined)} [online] Boolean that is true if a user is currently on the website, false when they do not have an instance of the website open
   * @param {?(FirebaseFirestore.DocumentReference | undefined)} [ref] Firestore document reference that points to the document we want to acess or make changes to
   */
  constructor(
    uid?: string | undefined,
    customer?: string | undefined,
    email?: string | undefined,
    temp?: string | undefined,
    discord?: string | undefined,
    username?: string | undefined,
    vanity?: string | undefined,
    timezone?: string | undefined,
    avatar?: string | undefined,
    banner?: string | undefined,
    online?: boolean | undefined,
    ref?: FirebaseFirestore.DocumentReference | undefined,
  ) {
    super(uid, customer, email, temp, discord, username, vanity, timezone, avatar, banner, online)
    this.ref = ref
  }

  
  /**
   * Method that creates a new Supporter object from the properties of the SupporterDBC
   *
   * @returns {Supporter}
   */
  toModel(): Supporter {
    return new Supporter(
      this.uid,
      this.customer,
      this.email,
      this.temp,
      this.discord,
      this.username,
      this.vanity,
      this.timezone,
      this.avatar,
      this.banner,
      this.online
    )
  }

  
  /**
   * Method that creates a new Firestore document in the 'supporters' collection, and saves the properties of the SupporterDBC object into that document
   *
   * @public
   * @async
   * @param {Supporter} supporter
   * @returns {Promise<FirebaseFirestore.WriteResult>}
   */
  public async writeNew(supporter: Supporter): Promise<FirebaseFirestore.WriteResult> {
    if (supporter.uid === null || supporter.uid === undefined) throw new Error('Missing UID')
      this.uid = supporter.uid
      this.customer = supporter.customer
      this.email = supporter.email
      this.username = supporter.username
      this.vanity = supporter.vanity
      this.discord = supporter.discord
      this.avatar = 'https://storage.googleapis.com/pv-default-avatar-public/supporters_avatar.jpg'
      const docRef = db.collection('supporters').doc(this.uid!)
      this.ref = docRef

      await db.collection('notifications').doc(this.uid)
      .set({ uid: this.uid })
      .catch(err => console.error(err))

      return await this.ref.withConverter(converter).set(this)
      .catch((err) => {
        throw new Error(err)
      })
  }

  public async fetchByUid(uid: string): Promise<SupporterDBC> {
    const doc = await db.collection('supporters')
      .doc(uid)
      .withConverter(converter)
      .get()
    return doc.data()!
  }

  public async discordLinkExists(code: string): Promise<boolean> {
    const q = await db.collection('supporters')
      .where('discord', '==', code)
      .withConverter(converter)
      .get()
    return q.empty
  }

  public async fetchByDiscord(discordId: string): Promise<SupporterDBC> {
    const q = await db.collection('supporters')
      .where('discord', '==', discordId)
      .withConverter(converter)
      .get()
    return q.docs[0].data()!
  }

  public async updateDiscord(code: string, discordId: string): Promise<Supporter> {
    const q = await db.collection('supporters')
      .where('discord', '==', code)
      .withConverter(converter)
      .get()
    if (q.empty) throw new Error('No supporter was found with this Discord link code.')
    await q.docs[0].ref.update({ discord: discordId })
    await new DiscordLinkDBC(q.docs[0].data().uid, 'supporters').write(discordId)
    return q.docs[0].data().toModel()
  }
}
