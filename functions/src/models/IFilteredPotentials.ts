import ParentDBC from '../dbc/ParentDBC'
import SessionDBC from '../dbc/SessionDBC'

export default interface IFilteredPotentials {
  parents: Array<ParentDBC>,
  sessions: Array<SessionDBC>
}
