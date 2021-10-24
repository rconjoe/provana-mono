import * as functions from 'firebase-functions'
import Stripe from 'stripe'
import * as sendgrid from '@sendgrid/mail'
import { ClientOptions } from '@grpc/grpc-js'

export var stripe = new Stripe(
  functions.config().stripe.test_key, {
    apiVersion: '2020-08-27'
  }
)

export var stripeRedirectUrl = 'http://localhost:8081'

sendgrid.setApiKey(functions.config().sendgrid.live_key)
export const sg = sendgrid

export var taskcfg: ClientOptions = {}
