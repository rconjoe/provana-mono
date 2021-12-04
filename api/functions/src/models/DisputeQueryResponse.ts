import Slot from './Slot'

export default interface DisputeQueryResponse {
  uid: string
  username: string
  slots: Array<Slot>
}
