import Stripe from 'stripe'
import * as sendgrid from '@sendgrid/mail'
import { ClientOptions, credentials } from '@grpc/grpc-js'

export var stripe = new Stripe(  "sk_test_51HJUgfGoIl5NLNcQ8xzPwo3tXqwoaGym8ZXwPBxbVWuOEEdCQxst4ORTV9x8GU4k4TK9uyFFiB9zLHMvDMLSV9UW00N8C4ejVB", {
    apiVersion: '2020-08-27',
    host: 'localhost',
    protocol: 'http',
    port: '12111'
  }
)

export var stripeRedirectUrl = 'http://localhost:8081'

sendgrid.setApiKey("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")
export const sg = sendgrid

export var taskcfg: ClientOptions = {
  port: 8001,
  servicePath: 'localhost',
  sslCreds: credentials.createInsecure()
}

// blah blah blah
