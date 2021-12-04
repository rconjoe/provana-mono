import * as dayjs from 'dayjs'
import * as utc from 'dayjs/plugin/utc'
import * as tz from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(tz)


/**
 * export for TimeService class
 *
 * @class TimeService
 * @typedef {TimeService}
 * @module TimeService
 * @category src
 * @subcategory services
 */
export default class TimeService {

  /**
   * Returns a unix timestamp of the date passed. If no date is passed, you get now.
   *
   * @public
   * @param {?Date} [date]
   * @returns {number}
   */
  public generate(date?: Date): number {
    const t = date ? date : Date.now()
    return dayjs(t).unix()
  }

  
  /**
   * takes a unix date time the name of a timezone for dayjs, it formates the date and time to something more readable and then casts them into a string and returns them in an object
   *
   * @public
   * @param {number} _time
   * @param {string} tz
   * @returns {LocalDateTime}
   */
  public toLocalDateTime(_time: number, tz: string): LocalDateTime {
    const date = new Date(_time * 1000)
    const djs = dayjs(date).tz(tz)
    return {
      date: dayjs(djs).format('YYYY-MM-DD').toString(),
      time: dayjs(djs).format('HH:mm').toString()
    }
  }
}
