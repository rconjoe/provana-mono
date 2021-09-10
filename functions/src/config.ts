import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import Stripe from 'stripe'
import * as sendgrid from '@sendgrid/mail'

// firebase
admin.initializeApp()
export const auth = admin.auth()
export const db = admin.firestore()
const settings = { timestampsInSnapshots: true }
db.settings(settings)
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
// stripe
export const stripeTestKey = "sk_test_51HJUgfGoIl5NLNcQ8xzPwo3tXqwoaGym8ZXwPBxbVWuOEEdCQxst4ORTV9x8GU4k4TK9uyFFiB9zLHMvDMLSV9UW00N8C4ejVB"
export var stripe: Stripe
  if (process.env.NODE_ENV === 'test') {
    stripe = new Stripe(stripeTestKey, {
      apiVersion: '2020-08-27',
      host: 'localhost',
      protocol: 'http',
      port: '12111'
    })
  }
  else stripe = new Stripe(functions.config().stripe.test_key, {
    apiVersion: '2020-08-27'
  })

// sendgrid
sendgrid.setApiKey('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')
export const sg = sendgrid

