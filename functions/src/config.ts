import * as admin from 'firebase-admin'
admin.initializeApp()
import 'reflect-metadata'
import Stripe from 'stripe'

export const auth = admin.auth()
export const db = admin.firestore()
const settings = { timestampsInSnapshots: true }
db.settings(settings)

export const stripeSecret = "sk_test_51HJUgfGoIl5NLNcQ8xzPwo3tXqwoaGym8ZXwPBxbVWuOEEdCQxst4ORTV9x8GU4k4TK9uyFFiB9zLHMvDMLSV9UW00N8C4ejVB"

export const stripe = new Stripe(stripeSecret, {
  apiVersion: '2020-08-27'
})

