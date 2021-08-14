import { Creator } from '../../models/Creator'
import { stripe } from '../../config'

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
}