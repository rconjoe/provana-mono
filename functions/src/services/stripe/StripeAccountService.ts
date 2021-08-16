import { Creator } from '../../models/Creator'
import { stripe } from '../../config'
import Stripe from 'stripe'

export class StripeAccountService {
  public async create(_newAccount: Creator): Promise<Creator> {
    const account = await stripe.accounts.create({
      country: 'US',
      type: 'express',
      email: _newAccount.email,
      metadata: { uid: _newAccount.uid! },
      capabilities: {
        card_payments: { requested: true, },
        transfers: { requested: true, },
      },
    })
    .catch((err) => {
      throw new Error(err)
    })
    _newAccount.account = account.id
    return _newAccount
  }

  public async generateAccountLink(accountId: string): Promise<Stripe.Response<Stripe.AccountLink>> {
    return await stripe.accountLinks.create({
      account: accountId,
      refresh_url: 'http://localhost:8080/onboardRetry',
      return_url: 'http://localhost:8080/onboardSuccess',
      type: 'account_onboarding'
    })
  }

  public async verifyAccountCapabilities(accountId: string): Promise<boolean> {
    const account = await stripe.accounts.retrieve(accountId)
    return account.details_submitted
  }
}