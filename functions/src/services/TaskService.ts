import { CloudTasksClient } from '@google-cloud/tasks'
import { credentials } from '@grpc/grpc-js'
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
    // https://github.com/aertje/cloud-tasks-emulator
    if (process.env.NODE_ENV === 'test') {
      this.client = new CloudTasksClient({
        port: 8001,
        servicePath: 'localhost',
        sslCreds: credentials.createInsecure()
      })
    }
    else this.client = new CloudTasksClient()
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
   * @param {number} secondsUntil
   * @returns {Promise<string>}
   */
  public async scheduleSlotStart(slotId: string, secondsUntil: number): Promise<string> {
    return await this.schedule(this.buildRequest('slot-start', slotId, secondsUntil))
  }

  
  /**
   * takes a firestore document id that points to a session, and the seconds until the session starts, and calls this.schedule() and this.buildRequest to create a session-start task
   *
   * @public
   * @async
   * @param {string} sessionId
   * @param {number} secondsUntil
   * @returns {Promise<string>}
   */
  public async scheduleSessionStart(sessionId: string, secondsUntil: number): Promise<string> {
    return await this.schedule(this.buildRequest('session-start', sessionId, secondsUntil))
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
   * takes a type which is the name of the queue the task needs to be put in, the task payload, and the seconds until the task needs to be fired, and sorts through a logic tree to build out the request and fufill all needed field
   * to build a CreateTaskRequest to pass to the schedule() method
   *
   * @private
   * @param {string} type
   * @param {string} payload
   * @param {?number} [secondsUntil]
   * @returns {protos.google.cloud.tasks.v2beta3.ICreateTaskRequest}
   */
  private buildRequest(type: string, payload: string, secondsUntil?: number)
  : protos.google.cloud.tasks.v2beta3.ICreateTaskRequest {
    let url: string
    let seconds: number
    const parent = this.client!.queuePath('db-abstract', 'us-central1', type)
    switch (type) {
      case 'no-abandoned-checkouts':
        url = 'https://us-central1-db-abstract.cloudfunctions.net/confirmCheckoutComplete'
        seconds = 300 + Date.now() / 1000
        break
      case 'slot-start':
        url = 'https://google.com'
        seconds = secondsUntil!
        break
      case 'session-start':
        url = 'https://google.com'
        seconds = secondsUntil!
        break
      // ...
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
