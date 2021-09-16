import { db } from '../config'


/**
 * Export for the TaskDBC class
 * @date 9/16/2021 - 3:08:50 PM
 *
 * @class TaskDBC
 * @typedef {TaskDBC}
 * @module TaskDBC
 * @category src
 * @subcategory dbc
 */
export default class TaskDBC {
  id: string | undefined
  path: string | undefined
  ref: FirebaseFirestore.DocumentReference | undefined

  
  /**
   * Creates an instance of TaskDBC.
   * @date 9/16/2021 - 3:09:29 PM
   *
   * @constructor
   * @param {?string} [id] Firestore document id 
   * @param {?string} [path] full project path to the task, if we need to do anything to the task such as cancel or run early
   * @param {?FirebaseFirestore.DocumentReference} [ref] Firestore document reference to the document we want to query or edit
   */
  constructor(
    id?: string,
    path?: string,
    ref?: FirebaseFirestore.DocumentReference
  ) {
    this.id = id
    this.path = path
    this.ref = ref
  }

  
  /**
   * Method that takes the full project path of the task and writes it on the Firestore document in the 'tasks' collection
   *
   * @public
   * @async
   * @param {string} task
   * @returns {Promise<void>}
   */
  public async write(task: string): Promise<void> {
    if (this.id === undefined) throw new Error('set ID to TaskDBC before writing path')
    await db.collection('tasks').doc(this.id!).set({
      path: task
    })
    .catch(err => {
      throw new Error(err)
    })
  }

  
  /**
   * Takes the id of the Firestore document as a paramater and goes into Firestore and deletes that document
   *
   * @public
   * @async
   * @param {string} id
   * @returns {Promise<void>}
   */
  public async delete(id: string): Promise<void> {
    await db.collection('tasks').doc(id).delete()
    .catch(err => {
      throw new Error(err)
    })
  }
}
