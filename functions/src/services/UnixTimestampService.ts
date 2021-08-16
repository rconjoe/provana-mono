import * as dayjs from 'dayjs'

export class UnixTimestampService {

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
}