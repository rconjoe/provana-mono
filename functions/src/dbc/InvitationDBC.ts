import { db } from '../config'
import Invitation from '../models/Invitation'
import Creator from '../models/Creator'
import TimeService from '../services/TimeService'


/**
 * Converter for either mapping data to a Firestore document snapshot or from Firestore to a CreatorDBC object
 * 
 * @returns {{ toFirestore(invitation: InvitationDBC): any; fromFirestore(snapshot: any): InvitationDBC; }}
 */
const converter = {
  toFirestore(invitation: InvitationDBC): FirebaseFirestore.DocumentData {
    return {
      id: invitation.id ? invitation.id : "",
      code: invitation.code ? invitation.code : "",
      generated: invitation.generated ? invitation.generated : 0,
      valid: invitation.valid ? invitation.valid : true,
      uid: invitation.uid ? invitation.uid : ""
    }
  },
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): InvitationDBC {
    const data = snapshot.data()
    return new InvitationDBC(
      data.id,
      data.code,
      data.generated,
      data.valid,
      data.uid,
      snapshot.ref
    )
  }
}


/**
 * Description placeholder
 *
 * @class InvitationDBC
 * @typedef {InvitationDBC}
 * @extends {Invitation}
 * @module InvitationDBC
 * @category src
 * @subcategory dbc
 */
export default class InvitationDBC extends Invitation {

  id: string | undefined
  code: string | undefined
  generated: number | undefined
  valid: boolean | undefined
  uid: string | undefined
  ref: FirebaseFirestore.DocumentReference | undefined


  /**
   * Creates an instance of InvitationDBC.
   * @date 9/15/2021 - 3:25:04 PM
   *
   * @constructor
   * @param {?string} [id] User's Discord  account id
   * @param {?string} [code] Alpha partner code, generated and distributed by the discord bot
   * @param {?number} [generated] Time that the alpha partner code was generated 
   * @param {?boolean} [valid] Boolean if the code is a valid code or not
   * @param {?string} [uid] The user's firebase uid
   * @param {?FirebaseFirestore.DocumentReference} [ref] Firestore document reference for use when we need to do anything to the Firestore document
   */
  constructor(
    id?: string,
    code?: string,
    generated?: number,
    valid?: boolean,
    uid?: string,
    ref?: FirebaseFirestore.DocumentReference,
  ) {
    super(id, code, generated, valid, uid)
    this.ref = ref
  }

  
  /**
   * Method that turns the InvitationDBC to a Invintation class
   *
   * @public
   * @returns {Invitation}
   */
  public toModel(): Invitation {
    return new Invitation(
      this.id,
      this.code,
      this.generated,
      this.valid,
      this.uid,
    )
  }

  
  /**
   * Setter method to set the user's discord account id
   *
   * @public
   * @param {string} discordUserID
   * @returns {InvitationDBC}
   */
  public setUser(discordUserID: string): InvitationDBC {
    this.id = discordUserID
    return this
  }

  
  /**
   * Method that either gets or creates a new invintation document in Firestore's 'invitations' collection
   * Calls this.exists()
   * 
   * @public
   * @async
   * @returns {Promise<string>}
   */
  public async getOrCreate(): Promise<string> {
    if (this.id === null || this.id === undefined) throw new Error('Discord ID is required to get or create')
    return (await this.exists()) ? await this.getFromId() : await this.create()
  }

  
  /**
   * Method that checks Firestore's 'invitations' collection to see if a document named after the user's Discord account id exists
   *
   * @public
   * @async
   * @returns {Promise<boolean>}
   */
  public async exists(): Promise<boolean> {
    const snap = await db.collection('invitations').doc(this.id!).get()
    return snap.exists
  }

  
  /**
   * Method that gets the data in Firestore's invitations collection with the user's Discord account id, and returns the invitation code
   *
   * @public
   * @async
   * @returns {Promise<string>}
   */
  public async getFromId(): Promise<string> {
    if (this.id === null || this.id === undefined) throw new Error('Discord ID is required to fetch invitation.')
    const snap = await db.collection('invitations').doc(this.id).withConverter(converter).get()
    return snap.data()!.code!
  }

  
  /**
   * Method that generates a new invitation code and saves it in Firestore's invitation collection in the document that is named after the user's Discord account id
   * Calls this.generateCode() to sudo randomly generate the code to be saved
   * 
   * @public
   * @async
   * @returns {Promise<string>}
   */
  public async create(): Promise<string> {
    this.ref = db.collection('invitations').doc(this.id!)
    this.code = this.generateCode()
    this.generated = new TimeService().generate()
    this.valid = true,
    await this.ref.withConverter(converter).set(this)
    return this.code
  }

  
  /**
   * Helper method that sudo randomly generates a new invitation code to be used in other methods
   *
   * @private
   * @returns {string}
   */
  private generateCode(): string {
    const code = []
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const len = characters.length
    for (let i=0; i<10; i++) {
      code.push(characters.charAt(Math.floor(Math.random() * len)))
    }
    return code.join('')
  }

  
  /**
   * Setter method to set the code property
   *
   * @public
   * @param {string} code
   * @returns {InvitationDBC}
   */
  public setCode(code: string): InvitationDBC {
    this.code = code
    return this
  }

  
  /**
   * Method that validates a invitation code is assosiated with that user's Discord account id
   * calls this.getFromCode()
   * 
   * @public
   * @async
   * @returns {Promise<boolean>}
   */
  public async validate(): Promise<boolean> {
    const doc = await this.getFromCode()
    return doc.valid!
  }

  
  /**
   * Method that assocites a user's  Firebase uid to the generated code by updated the Firestore document
   *
   * @public
   * @async
   * @param {Creator} creator
   * @returns {Promise<FirebaseFirestore.WriteResult>}
   */
  public async associate(creator: Creator): Promise<FirebaseFirestore.WriteResult> {
    if (!creator.uid || !creator.code) throw new Error('Code and UID needed to associate Invitation with user.')
    const q = await db.collection('invitations').where('code', '==', creator.code).get()
    if (q.empty) throw new Error('Invitation not found in Firestore.')
    return await q.docs[0].ref.update({
      uid: creator.uid,
      valid: false
    })
  }

  
  /**
   * Helper method that gets the Firebase document by preforming a query with the invitation code to find the proper document
   *
   * @private
   * @async
   * @returns {Promise<InvitationDBC>}
   */
  private async getFromCode(): Promise<InvitationDBC> {
    if (this.code === "" || this.code === undefined) throw new Error('Invitation code is required.')
    const invitation =  await db.collection('invitations').where('code', '==', this.code).withConverter(converter).get()
    if (invitation.empty === true) throw new Error('Invitation not found')
    return invitation.docs[0].data()!
  }
}
