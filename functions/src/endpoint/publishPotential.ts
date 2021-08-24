import * as functions from 'firebase-functions'
import PotentialDBC from '../dbc/PotentialDBC'
import SessionDBC from '../dbc/SessionDBC'
import ParentDBC from '../dbc/ParentDBC'
import IFilteredPotentials from '../models/IFilteredPotentials'

export const publishPotential = functions.https.onCall(async (data, context) => {
  const dbc = new PotentialDBC().setSellerUid(data.uid)
  const potentials = await dbc.fetchByUid()
  const filter = (potentials: Array<PotentialDBC>): IFilteredPotentials => {
    let parents: Array<ParentDBC> = []
    let sessions: Array<SessionDBC> = []
    potentials.forEach((s) => {
      if (s.slots! > 1) {
        parents.push(new ParentDBC(
          s.sellerUid,
          s.slots,
          s.serviceDocId,
          s.mandatoryFill,
          s.name,
          s.color,
          s.serviceColor,
          s.start,
          s.end,
          s.id,
          s.status,
          s.ref
        ))
      }
      else {
        sessions.push(new SessionDBC(
          s.id,
          s.sellerUid,
          "",
          "",
          "",
          s.serviceDocId,
          s.name,
          s.color,
          s.serviceColor,
          s.start,
          s.end,
          s.status,
          s.ref
        ))
      }
    })
    return { parents, sessions }
  }
  const filtered = filter(potentials)
  filtered.parents.forEach(async (parent) => {
    await parent.publish()
  })
  filtered.sessions.forEach(async (session) => {
    await session.publish()
  })
  return 'ok'
})