import { db } from '../config'

export default class TaskDBC {
  id: string | undefined
  path: string | undefined
  ref: FirebaseFirestore.DocumentReference | undefined

  constructor(
    id?: string,
    path?: string,
    ref?: FirebaseFirestore.DocumentReference
  ) {
    this.id = id
    this.path = path
    this.ref = ref
  }

  public async write(taskRecord: {
    id: string,
    path: string
  }): Promise<void> {
    await db.collection('tasks').doc(taskRecord.id).set({
      path: taskRecord.path
    })
    .catch(err => {
      throw new Error(err)
    })
  }

  public async delete(id: string): Promise<void> {
    await db.collection('tasks').doc(id).delete()
    .catch(err => {
      throw new Error(err)
    })
  }
}
