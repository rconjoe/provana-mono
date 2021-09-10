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

  public async write(task: string): Promise<void> {
    if (this.id === undefined) throw new Error('set ID to TaskDBC before writing path')
    await db.collection('tasks').doc(this.id!).set({
      path: task
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
