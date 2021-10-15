import { CloudTasksClient } from '@google-cloud/tasks'
import { taskcfg } from '../config'
import * as protos from '@google-cloud/tasks/build/protos/protos'


/**
 * Export for the TaskService class
 * @date 9/17/2021 - 11:57:28 AM
 *
 * @class TaskService
 * @typedef {TaskService}
 * @module TaskService
 * @category src
 * @subcategory services
 */
export default class TaskService {
  client: CloudTasksClient | undefined

  
  /**
   * Creates an instance of TaskService when node is in the 'test' enviornment or just creates a new CloudTaskClient object.
   *
   * @constructor
   */
  constructor() {
    this.client = new CloudTasksClient(taskcfg)
  }

  
  /**
   * Take a slot id and calls this.schedule() and this.buildRequest to create a no-abandoned-checkouts task
   *
   * @public
   * @async
   * @param {string} slotId
   * @returns {Promise<string>}
   */
  public async onCheckout(slotId: string): Promise<string> {
    return await this.schedule(this.buildRequest('no-abandoned-checkouts', slotId))
  }

  
  /**
   * takes a firestore document id that points to a slot, and the seconds until the session starts, and calls this.schedule() and this.buildRequest to create a slot-start task
   *
   * @public
   * @async
   * @param {string} slotId
   * @param {number} fireTime
   * @returns {Promise<string>}
   */
  public async scheduleSlotStart(slotId: string, fireTime: number): Promise<string> {
    return await this.schedule(this.buildRequest('slot-start', slotId, fireTime))
  }

  
  /**
   * takes a firestore document id that points to a session, and the seconds until the session starts, and calls this.schedule() and this.buildRequest to create a session-start task
   *
   * @public
   * @async
   * @param {string} sessionId
   * @param {number} fireTime
   * @returns {Promise<string>}
   */
  public async scheduleSessionStart(sessionId: string, fireTime: number): Promise<string> {
    return await this.schedule(this.buildRequest('session-start', sessionId, fireTime))
  }

  
  /**
   * Takes the firebase document id of a slot, and the number of seconds untill the task will be executed, and schedules a new 'capture' task
   *
   * @public
   * @async
   * @param {string} slotId
   * @param {number} fireTime
   * @returns {Promise<string>}
   */
  public async scheduleCapture(slotId: string, fireTime: number): Promise<string> {
    return await this.schedule(this.buildRequest('capture', slotId, fireTime))
  }

  public async scheduleRelease(slotId: string, fireTime: number): Promise<string> {
    return await this.schedule(this.buildRequest('release', slotId, fireTime))
  }

  
  /**
   * Takes a CreateTaskRequest, and uses the CloudTaskClient to create a new task and returns the task's name
   *
   * @private
   * @async
   * @param {protos.google.cloud.tasks.v2beta3.ICreateTaskRequest} request
   * @returns {Promise<string>}
   */
  private async schedule(request: protos.google.cloud.tasks.v2beta3.ICreateTaskRequest)
  : Promise<string> {
    const [ task ] = await this.client!.createTask(request)
    .catch(err => {
      throw new Error(err)
    })
    return task.name!
  }

  
  /**
   * Takes the absolute path in the project to the cloud task and deletes the task at the path provided
   *
   * @public
   * @async
   * @param {string} path
   */
  public async cancel(name: string) {
    await this.client!.deleteTask({name: name})
      .catch(err => {
        throw new Error(err)
      })
  }
  
  /**
   * takes a type which is the name of the queue the task needs to be put in, the task payload, and the seconds until the task needs to be fired, and sorts through a logic tree to build out the request and fufill all needed field
   * to build a CreateTaskRequest to pass to the schedule() method
   *
   * @private
   * @param {string} type
   * @param {string} payload
   * @param {?number} [fireTime]
   * @returns {protos.google.cloud.tasks.v2beta3.ICreateTaskRequest}
   */
  private buildRequest(type: string, payload: string, fireTime?: number)
  : protos.google.cloud.tasks.v2beta3.ICreateTaskRequest {
    let url: string
    let seconds: number
    const parent = this.client!.queuePath('db-abstract', 'us-central1', type)
    switch (type) {
      case 'no-abandoned-checkouts':
        url = 'https://us-central1-db-abstract.cloudfunctions.net/confirmCheckoutComplete'
        // 5 minutes after checkout 
        seconds = 300 + Date.now() / 1000
        break
      case 'slot-start':
        url = 'https://us-central1-db-abstract.cloudfunctions.net/startSlot'
        // @ slot start time
        seconds = fireTime!
        break
      case 'session-start':
        url = 'https://google.com'
        // @ session start time
        seconds = fireTime!
        break
      case 'capture':
        url = 'https://google.com'
        // 6 hours after session start time
        seconds = fireTime!
      case 'release':
        url = 'https://google.com'
        // 6 hours after slot start time, replaces capture task
        seconds = fireTime!
      default:
        url = 'crazy.net'
        seconds = 10
        break
    }
    const task: protos.google.cloud.tasks.v2beta3.ITask = {
      httpRequest: {
        httpMethod: 'POST',
        url,
        body: Buffer.from(payload).toString('base64'),
        headers: {
          'Content-Type': 'application/octet-stream'
        }
      },
      scheduleTime: {
        seconds: seconds
      }
    }
    return { parent, task }
  }
}
