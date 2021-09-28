import * as admin from 'firebase-admin'

// utility for array updating to avoid importing admin elsewhere:
export const addToArray = async (data: {ref: FirebaseFirestore.DocumentReference, field: string, value: string})
  :Promise<FirebaseFirestore.WriteResult> => {
    return await data.ref.update({
      [data.field]: admin.firestore.FieldValue.arrayUnion(data.value)
    })
      .catch(err => {
        throw new Error(err)
      })
}
export const removeFromArray = async (data: {ref: FirebaseFirestore.DocumentReference, field: string, value: string})
  :Promise<FirebaseFirestore.WriteResult> => {
    return await data.ref.update({
      [data.field]: admin.firestore.FieldValue.arrayRemove(data.value)
    })
      .catch(err => {
        throw new Error(err)
      })
}
// and also for incrementing/decrementing numeric value:
export const increment = async (data: {ref: FirebaseFirestore.DocumentReference, field: string, amount: number})
  :Promise<FirebaseFirestore.WriteResult> => {
    return await data.ref.update({
      [data.field]: admin.firestore.FieldValue.increment(data.amount)
    })
      .catch(err => {
        throw new Error(err)
      })
  }
export const decrement = async (data: {ref: FirebaseFirestore.DocumentReference, field: string, amount: number})
  :Promise<FirebaseFirestore.WriteResult> => {
    return await data.ref.update({
      [data.field]: admin.firestore.FieldValue.increment(-data.amount)
    })
      .catch(err => {
        throw new Error(err)
      })
  }
