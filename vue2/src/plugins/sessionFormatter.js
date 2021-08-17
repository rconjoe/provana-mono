import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { store } from '../store/index'
dayjs.extend(utc)
dayjs.extend(timezone)

export const formatter = (data) => {
  const tz = store.state.auth.tz
  // unix to dayjs
  const _start = dayjs.unix(data.start).format()
  const _end = dayjs.unix(data.end).format()
  // localize
  const localStart = dayjs(_start).tz(tz)
  const localEnd = dayjs(_end).tz(tz)
  // format for v-cal
  const formattedStart = dayjs(localStart).format('YYYY-MM-DD HH:mm')
  const formattedEnd = dayjs(localEnd).format('YYYY-MM-DD HH:mm')
  const session = {
    name: data.name,
    color: data.color,
    serviceColor: data.serviceColor,
    start: formattedStart,
    end: formattedEnd,
    status: data.status,
    participants: data.participants,
    buyerUid: data.buyerUid,
    slot: data.slot,
    slots: data.slots,
    parentSession: data.parentSession,
    sellerUid: data.sellerUid,
    serviceDocId: data.serviceDocId,
    id: data.id,
  }
  return session
}