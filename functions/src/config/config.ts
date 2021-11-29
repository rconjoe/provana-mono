import Stripe from 'stripe'
import * as sendgrid from '@sendgrid/mail'
import { ClientOptions   } from '@grpc/grpc-js'

export var stripe = new Stripe('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', {
    apiVersion: '2020-08-27',
  }
)

export var stripeRedirectUrl = 'https://alpha.provana.gg'

sendgrid.setApiKey("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")
export const sg = sendgrid

export var taskcfg: ClientOptions = {}
export const project = 'pv-stage-1'
