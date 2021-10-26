import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { store } from '../store/index'
dayjs.extend(utc)
dayjs.extend(timezone)

export const formatter = (unix) => {
  const tz = store.state.auth.tz
  // unix to dayjs
  const djs = dayjs.unix(unix).format()
  // localize
  const local = dayjs(djs).tz(tz)
  // format for v-cal
  const formatted = dayjs(local).format('YYYY-MM-DD HH:mm')
  return formatted
}
