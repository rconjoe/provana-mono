import * as dayjs from 'dayjs'
import * as utc from 'dayjs/plugin/utc'
import * as tz from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(tz)

export default class TimeService {

  /**
   * Returns a unix timestamp of the date passed. If no date is passed, you get now.
   * @date 8/13/2021 - 3:41:17 PM
   *
   * @public
   * @param {?Date} [date]
   * @returns {number}
   */
  public generate(date?: Date): number {
    const t = date ? date : Date.now()
    return dayjs(t).unix()
  }

  public toLocalDateTime(_time: number, tz: string): LocalDateTime {
    const date = new Date(_time * 1000)
    const djs = dayjs(date).tz(tz)
    return {
      date: dayjs(djs).format('YYYY-MM-DD').toString(),
      time: dayjs(djs).format('HH:mm').toString()
    }
  }
}
