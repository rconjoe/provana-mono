import * as admin from 'firebase-admin'
// import * as functions from 'firebase-functions'
import Stripe from 'stripe'
import * as sendgrid from '@sendgrid/mail'
import { ClientOptions, credentials } from '@grpc/grpc-js'

// firebase
admin.initializeApp()
export const auth = admin.auth()
export const db = admin.firestore()
const settings = { timestampsInSnapshots: true }
db.settings(settings)

// stripe
export const stripeTestKey = "sk_test_51HJUgfGoIl5NLNcQ8xzPwo3tXqwoaGym8ZXwPBxbVWuOEEdCQxst4ORTV9x8GU4k4TK9uyFFiB9zLHMvDMLSV9UW00N8C4ejVB"
export var stripe = 
  // if (process.env.NODE_ENV === 'test') {
    new Stripe(stripeTestKey, {
      apiVersion: '2020-08-27',
      host: 'localhost',
      protocol: 'http',
      port: '12111'
    })
  // }
  // else stripe = new Stripe(functions.config().stripe.test_key, {
  //   apiVersion: '2020-08-27'
  // })

// sendgrid
sendgrid.setApiKey('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')
export const sg = sendgrid

export var taskcfg: ClientOptions

// if (process.env.NODE_ENV === 'test') {
  taskcfg = {
    port: 8001,
    servicePath: 'localhost',
    sslCreds: credentials.createInsecure()
  }
// }
// else taskcfg = {}
