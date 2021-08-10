import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
admin.initializeApp()

import Stripe from 'stripe'

export const db = admin.firestore()
const settings = { timestampsInSnapshots: true }
db.settings(settings)

export const stripeSecret = functions.config().stripe.test_key

export const stripe = new Stripe(stripeSecret, {
  apiVersion: '2020-08-27'
})

