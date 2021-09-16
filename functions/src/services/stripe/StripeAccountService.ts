import Creator from '../../models/Creator'
import { stripe } from '../../config'
import Stripe from 'stripe'



/**
 * Export for the StripeAccountService class
 *
 * @class StripeAccountService
 * @typedef {StripeAccountService}
 * @module StripeAccountService
 * @category src
 * @subcategory services/stripe
 */
export default class StripeAccountService {

  
  /**
   * Takes a Creator object and calls the Stripe Accounts api to create a new stripe account and sets the account property on the object with the account id return from stripe
   *
   * @public
   * @async
   * @param {Creator} _newAccount
   * @returns {Promise<Creator>}
   */
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

  
  /**
   * takes a Stripe account id and sets the callback and retry url's and returns the url to continue on with the stripe onboarding flow.
   * Stripe docs: https://stripe.com/docs/api/account_links/create
   *
   * @public
   * @async
   * @param {string} accountId
   * @returns {Promise<Stripe.Response<Stripe.AccountLink>>}
   */
  public async generateAccountLink(accountId: string): Promise<Stripe.Response<Stripe.AccountLink>> {
    return await stripe.accountLinks.create({
      account: accountId,
      refresh_url: 'http://localhost:8080/onboardRetry',
      return_url: 'http://localhost:8080/onboardSuccess',
      type: 'account_onboarding'
    })
  }

  
  /**
   * Calls stripe Accounts api to retrieve the details of the stripe account
   *
   * @public
   * @async
   * @param {string} accountId
   * @returns {Promise<boolean>}
   */
  public async verifyAccountCapabilities(accountId: string): Promise<boolean> {
    const account = await stripe.accounts.retrieve(accountId)
    console.log(account)
    return account.details_submitted
  }
}
